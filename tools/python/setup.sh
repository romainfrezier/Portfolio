#!/bin/bash

if [ -d "venv" ]; then
    echo "L'environnement virtuel existe déjà."
else
    echo "Création de l'environnement virtuel..."
    python3 -m venv venv
fi

echo "Activation de l'environnement virtuel..."
source venv/bin/activate

echo "Installation des dépendances..."
pip install -r requirements.txt

echo "Tout est prêt ! L'environnement est actif."
