for file in cities/*/*.png; do
	new_name="public/$(dirname "$file")/$(basename "$file" .png).jpg"
	mkdir -p "$(dirname "$new_name")"
	echo "Converting '$file' to '$new_name'"
	convert "$file" -resize 200x200 -dither FloydSteinberg -remap netscape: "$new_name"
done
