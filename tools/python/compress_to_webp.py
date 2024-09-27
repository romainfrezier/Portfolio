import os
from PIL import Image
import pillow_heif
import hashlib
import argparse

pillow_heif.register_heif_opener()

def compress_image(image, output_path, target_format, max_size_kb):
    quality = 100
    while True:
        image.save(output_path, target_format.upper(), quality=quality)
        file_size = os.path.getsize(output_path) / 1024
        if file_size <= max_size_kb or quality <= 10:
            break
        quality -= 5

def convert_images(input_folder, output_folder, target_name, target_format, max_size_kb):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    supported_formats = ['.png', '.jpeg', '.jpg', '.heic']
    counter = 1
    for filename in os.listdir(input_folder):
        file_base, file_ext = os.path.splitext(filename)
        if file_ext.lower() in supported_formats:
            image_path = os.path.join(input_folder, filename)
            image = Image.open(image_path)
            new_filename = f"{target_name}-{counter}.{target_format}"
            output_path = os.path.join(output_folder, new_filename)
            try:
                compress_image(image, output_path, target_format, max_size_kb=max_size_kb)
                print(f"Image {counter} converti et compressé avec succès en {new_filename} !")
            except Exception as e:
                print(f"Erreur lors de la conversion de {filename}: {e}")
            counter += 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convertir et compresser des images.')
    parser.add_argument('--input_folder', type=str, default='./input', help='Dossier d\'entrée des images.')
    parser.add_argument('--output_folder', type=str, default='./output', help='Dossier de sortie des images.')
    parser.add_argument('--target_name', type=str, default='image', help='Nom de conversion cible (ex: image-aventure).')
    parser.add_argument('--target_format', type=str, default='webp', help='Format de conversion cible (ex: webp).')
    parser.add_argument('--max_size_kb', type=int, default=500, help='Taille maximale du fichier en Ko.')

    args = parser.parse_args()

    convert_images(args.input_folder, args.output_folder, target_name=args.target_name, target_format=args.target_format, max_size_kb=args.max_size_kb)
