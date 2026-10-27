# La Pause d'Angel — site one-page

Site statique (HTML / CSS / JS), prêt à déployer, sans étape de compilation.
Identité reprise de l'Instagram : noir chaud, crème, or doré, serif Playfair Display.

## Lancer le site
- **En ligne** : glissez le dossier entier sur Netlify, Vercel, Cloudflare Pages ou GitHub Pages.
- **En local** : double-clic sur `index.html` (aucun serveur nécessaire).

## Structure
```
index.html          page + SEO (title, Open Graph, schema.org Restaurant)
styles.css          design (couleurs et polices en haut du fichier, section :root)
main.js             rendu de la carte, onglets, horaires ouvert/fermé, animations
data/menu.js      TOUTE la carte (burgers, prix, allergènes, enfant, boissons…)
assets/logo.png     logo rond (header, footer, favicon)
assets/photos/      photos (voir ci-dessous)
assets/videos/      vidéo hero optionnelle (hero.mp4)
```

## Modifier la carte
Tout est dans `data/menu.js` : prix (nombres), ingrédients, allergènes (A à E), notes.
- Pour ajouter la photo d'un burger sans photo (Montagnard, Vosgien, Berger, Jurassien, Giga) :
  renseignez `"photo": "assets/photos/vosgien.webp"` et `"photoW"` / `"photoH"` (en pixels).
  Il passe automatiquement en grande section plein écran.
- Icônes d'ingrédients disponibles : beef, sauce, leaf, tomato, pickle, onion, cheese, chicken, bacon, potato, egg, honey, ring, veggie.

## Photos
| Fichier | Usage |
|---|---|
| `classic.webp` | hero + Le Classic |
| `chicken.webp`, `italien.webp`, `vegetarien.webp`, `cowboy.webp` | grandes sections burgers |
| `burger-signature.webp` | bandeau « Du généreux… » |
| `tenders.webp` | onglet Accompagnements |
| `bieres.webp` | onglet Boissons |
| `og-image.jpg` (dans `assets/`) | aperçu de partage (1200×630) |

Les photos actuelles ont été découpées dans des captures d'écran de l'Instagram (≈ 700–1080 px de large) :
c'est suffisant pour le mobile, mais pour un rendu parfait sur grand écran, remplacez-les par les fichiers
originaux en gardant **les mêmes noms** (WebP, ~1800 px de large) et mettez à jour `photoW` / `photoH` dans `menu.js`.

## Vidéo hero (optionnelle)
Déposez `assets/videos/hero.mp4` (10–15 s, sans son, < 4 Mo, 1080p) : elle remplace automatiquement la photo du hero.
Sans fichier, la photo s'affiche (aucune erreur).

## Horaires
Le statut « Ouvert maintenant / Fermé » et le jour en surbrillance se calculent à l'heure de Paris.
Pour changer les horaires : tableau `HORAIRES` en haut de `main.js`, tableau HTML dans `index.html` (section Infos)
et `openingHoursSpecification` dans le bloc JSON-LD de `index.html`.

## Avant la mise en ligne
- Vérifier l'adresse du site dans `index.html` (balises `canonical`, `og:url`, `og:image`, JSON-LD) : `https://lapause-dangel.fr/` est utilisée d'après la bio Instagram.
- Vérifier que les visuels représentent fidèlement les plats servis.
