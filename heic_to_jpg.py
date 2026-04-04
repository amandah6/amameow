from PIL import Image
from pillow_heif import register_heif_opener
import os
import datetime

directory = "./static/big"
output_path = "./static/gallery-new"
output_width = 2048
# find all heic files
heic_files = [
    os.path.join(directory, file) 
    for file in os.listdir(directory) 
    if file.lower().endswith(('.heic', '.heif'))
]

print(heic_files)
register_heif_opener()
# for each file
for file in heic_files:
    with Image.open(file) as im:
        # get the width/height
        # divide each width/height dimension by 4.4625
        # resize, scale to width = output_width
        scale = im.width / output_width
        (width, height) = (int(im.width // scale), int(im.height // scale))
        im = im.resize((width, height), Image.LANCZOS)
    

        # convert to jpg, saving exif data
        # date.jpg as image name
        # Automatically handle and preserve EXIF metadata
        exif_data = im.info.get("exif")
        heic_stat = os.stat(file)
        
        jpg_path = datetime.datetime.fromtimestamp(heic_stat.st_mtime).strftime('%Y-%m-%d_%H-%M') + ".jpg"
        jpg_path = os.path.join(output_path, jpg_path)
        print(width, height, jpg_path)

        im.save(jpg_path, "JPEG", exif=exif_data)
        
        # Preserve the original access and modification timestamps
        os.utime(jpg_path, (heic_stat.st_atime, heic_stat.st_mtime))
