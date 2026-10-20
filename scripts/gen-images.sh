#!/bin/bash
# Sequential image generation - resilient, skips existing files
OUT=/home/z/my-project/public/images
mkdir -p "$OUT"

gen() {
  local prompt="$1"
  local file="$2"
  local size="$3"
  if [ -s "$OUT/$file" ]; then
    echo "SKIP (exists): $file"
    return 0
  fi
  for attempt in 1 2 3; do
    echo "GEN: $file (attempt $attempt) $(date +%H:%M:%S)"
    timeout 150 z-ai image -p "$prompt" -o "$OUT/$file" -s "$size" >/dev/null 2>&1
    if [ -s "$OUT/$file" ]; then
      echo "OK: $file $(date +%H:%M:%S)"
      return 0
    fi
    sleep 2
  done
  echo "FAIL: $file"
}

echo "=== Start $(date +%H:%M:%S) range: ${1:-1}-${2:-10} ==="
IMAGES=(
"gen:Cinematic overhead food photography of authentic homemade Hyderabadi biryani in a large hammered aluminum pot, long-grain basmati rice in three colors white yellow and orange saffron strands, tender braised meat chunks, crispy golden fried onions, fresh cilantro and mint leaves, gentle steam rising, dark moody rustic kitchen background, warm golden dramatic side lighting, professional food styling, ultra realistic, high quality, detailed|hero-biryani.png|1344x768"
"gen:Professional food photography of chicken biryani served on an elegant dark ceramic plate, fragrant long grain basmati rice with saffron yellow white and orange grains, juicy roasted chicken leg piece on top, caramelized fried birista onions, fresh mint leaves, whole spices visible, steam wisps, warm restaurant lighting, dark slate background, shallow depth of field, ultra realistic, mouth watering, high quality|dish-chicken.png|1024x1024"
"gen:Professional food photography of beef biryani on a rustic dark plate, tender slow braised beef chunks with rich brown masala coating fluffy basmati rice grains, three colored saffron rice white yellow orange, crispy fried onions, fresh cilantro garnish, steam rising, moody dark background, dramatic warm side light, macro detail, ultra realistic, mouth watering, high quality|dish-beef.png|1024x1024"
"gen:Professional food photography of luxurious lamb mutton biryani on an elegant black stone plate, fall-apart tender lamb shank piece, fragrant saffron basmati rice in white golden and amber colors, golden fried shallots, pomegranate seeds and mint garnish, saffron threads sprinkled, steam wisps, dark moody fine dining presentation, dramatic lighting, ultra realistic, mouth watering, high quality|dish-lamb.png|1024x1024"
"gen:Elegant flat lay food photography of premium ingredients on dark textured stone surface, golden olive oil being poured in thin stream into small glass bowl, vibrant red saffron threads in tiny ceramic dish, cinnamon sticks, green cardamom pods, star anise, whole cloves, bay leaves, dramatic chiaroscuro lighting, luxury editorial style, ultra realistic, high quality|ingredients-saffron-oil.png|1024x1024"
"gen:Overhead flat lay photography of uncooked premium long grain basmati rice in rustic bowl surrounded by fresh ingredients, ripe red tomatoes, green chilies, fresh mint and cilantro bunches, lemons, garlic bulbs, ginger root, whole spices scattered, dark moody wooden table, warm natural light, professional food styling, ultra realistic, high quality|ingredients-rice.png|1024x1024"
"gen:Cinematic food photography of traditional dum cooking, large heavy bottomed pot sealed with golden dough strip on the lid, gentle steam escaping from the edges, warm ember glow from gas stove flame below, dark cozy kitchen atmosphere, orange warm lighting, dramatic shadows, ultra realistic, atmospheric, high quality|craft-dum.png|864x1152"
"gen:Close up food photography of hands gently layering fluffy cooked saffron basmati rice over caramelized onions and marinated meat in a large copper pot, three colored rice grains white saffron yellow and amber, visible steam, warm golden kitchen lighting, shallow depth of field, rustic authentic atmosphere, ultra realistic, high quality|craft-layering.png|1152x864"
"gen:Macro photography of premium red saffron threads blooming in warm golden milk, deep amber orange color releasing into the liquid, elegant glass bowl on dark wooden surface, honey dipper nearby, dramatic warm lighting, luxury food editorial, ultra realistic, high quality|craft-saffron.png|1024x1024"
"gen:Professional food photography of a single serving homemade biryani bowl, layered three color basmati rice with tender chicken piece, fried onions, mint garnish, served in a modern matte black bowl on wooden board with small side of green mint chutney, clean minimal styling, soft natural window light, appetizing, ultra realistic, high quality|serving-solo.png|1024x1024"
)
FROM=${1:-1}
TO=${2:-10}
for i in $(seq "$FROM" "$TO"); do
  entry="${IMAGES[$((i-1))]}"
  body="${entry#gen:}"          # PROMPT|FILE|SIZE
  p="${body%%|*}"               # PROMPT
  rest="${body#*|}"             # FILE|SIZE
  f="${rest%%|*}"               # FILE
  s="${rest#*|}"                # SIZE
  gen "$p" "$f" "$s"
done
echo "=== Done $(date +%H:%M:%S) ==="
