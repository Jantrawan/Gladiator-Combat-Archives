import csv
import json
import os

os.makedirs('data', exist_ok=True)

gladiators = []
with open('gladiator_data.csv', mode='r', encoding='utf-8', errors='replace') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader):
        # Clean and typecast key fields
        try:
            wins = int(float(row.get('Wins', 0)))
        except:
            wins = 0
        try:
            losses = int(float(row.get('Losses', 0)))
        except:
            losses = 0
        try:
            age = int(float(row.get('Age', 0)))
        except:
            age = 0
        try:
            height = float(row.get('Height', 0))
        except:
            height = 0
        try:
            weight = float(row.get('Weight', 0))
        except:
            weight = 0
        try:
            public_favor = round(float(row.get('Public Favor', 0)), 2)
        except:
            public_favor = 0.0

        item = {
            "id": i + 1,
            "name": row.get('Name', '').strip(),
            "age": age,
            "birthYear": row.get('Birth Year', '').strip(),
            "origin": row.get('Origin', '').strip(),
            "height": height,
            "weight": weight,
            "category": row.get('Category', '').strip(),
            "wins": wins,
            "losses": losses,
            "weapon": row.get('Weapon of Choice', '').strip(),
            "previousOccupation": row.get('Previous Occupation', '').strip(),
            "patronWealth": row.get('Patron Wealth', '').strip(),
            "trainingIntensity": row.get('Training Intensity', '').strip(),
            "publicFavor": public_favor,
            "injuryHistory": row.get('Injury History', '').strip(),
            "equipmentQuality": row.get('Equipment Quality', '').strip(),
            "mentalResilience": round(float(row.get('Mental Resilience', 1.0)), 2) if row.get('Mental Resilience') else 1.0,
            "battleExperience": row.get('Battle Experience', '').strip(),
            "survived": row.get('Survived', '').strip().lower() in ['true', '1', 'yes']
        }
        gladiators.append(item)

print(f"Total gladiators processed: {len(gladiators)}")

# Save full json
with open('data/gladiators.json', 'w', encoding='utf-8') as f:
    json.dump(gladiators, f, ensure_ascii=False)

# Compute stats for Home page
from collections import Counter
category_counts = Counter(g['category'] for g in gladiators)
weapon_counts = Counter(g['weapon'] for g in gladiators)
origin_counts = Counter(g['origin'] for g in gladiators)
injury_counts = Counter(g['injuryHistory'] for g in gladiators)
total_wins = sum(g['wins'] for g in gladiators)
total_losses = sum(g['losses'] for g in gladiators)

stats = {
    "totalGladiators": len(gladiators),
    "totalWins": total_wins,
    "totalLosses": total_losses,
    "avgWins": round(total_wins / len(gladiators), 1),
    "avgLosses": round(total_losses / len(gladiators), 1),
    "categories": dict(category_counts.most_common()),
    "weapons": dict(weapon_counts.most_common()),
    "origins": dict(origin_counts.most_common()),
    "injuries": dict(injury_counts.most_common()),
    "topFighters": sorted(gladiators, key=lambda x: x['wins'], reverse=True)[:8]
}

with open('data/stats.json', 'w', encoding='utf-8') as f:
    json.dump(stats, f, ensure_ascii=False, indent=2)

print("Export completed: data/gladiators.json and data/stats.json")
