import os
from PIL import Image
import glob

# Chemin du dossier contenant les images
folder_path = './src/assets/images/work-experiences/'

# Obtenir la liste de tous les fichiers .png dans le dossier
png_files = glob.glob(os.path.join(folder_path, '*.png'))

# Boucler a travers tous les fichiers .png et les convertir en .webp
for png_file in png_files:
    # Ouvrir l'image .png
    img = Image.open(png_file)

    # Obtenir le nom de base du fichier sans l'extension
    base_name = os.path.splitext(png_file)[0]

    # Construire le nom de fichier de sortie .webp
    webp_file = base_name + '.webp'

    # Sauvegarder l'image en .webp
    img.save(webp_file, 'webp')
    print(png_file + 'converti en ' + webp_file)

print('Conversion terminee !')
