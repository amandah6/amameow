# create a list of all bottlecap images in the directory /static/bottlecaps
# generate the cci link "https://crowncaps.info/caps/" + id
# generate the content markdown file
# ---
# title: Bottlecap Gallery
# images:
    # - src: "120916.png"
    #   url: "https://crowncaps.info/caps/120916"
# ---
# https://www.geeksforgeeks.org/python/python-list-files-in-a-directory/
import os
import math
from PIL import Image
from datetime import datetime

path = os.path.abspath("./static/gallery")

def generate_md():
    obj = os.scandir(path)
    fd = os.open("gallery_test.md", os.O_RDWR)

    # convert posix obj into list of filenames
    files = [entry for entry in obj if entry.is_file()]
    filenames = [file.name.split('.')[0] for file in files]

    #  sort said filenames
    filenames.sort(key=lambda x: datetime.strptime(x, "%Y-%m-%d_%H-%M"), reverse=True)
    print(filenames)

    # loop through sorted list, write line to .md
    for file in filenames:
        s = '    - src: "/gallery/' + file + '.jpg"\n      thumbnail: "/gallery/thumbnails/' + file + '_512px.jpg"\n      date: "' + file.split("_")[0] + '"\n      desc: ""\n'
        line = str.encode(s)
        os.write(fd, line)
    os.close(fd)

def resize_images(output_width):
    print(path)
    obj = os.listdir(path)
    for entry in obj:
        if entry[0] != '.':
            file = os.path.join(path, entry)
            with Image.open(file) as im:
                if im.width > output_width:
                    scale = im.width / output_width
                    (width, height) = (math.ceil(im.width / scale), math.ceil(im.height / scale))
                    print((width, height))
                    im_resized = im.resize((width, height), Image.LANCZOS)
                    im_resized.save(file.split('.')[0] + "_" + str(output_width) + "px.jpg")


if __name__ == "__main__":
    import sys
    if sys.argv[1] == "generate_md":
        generate_md()
    elif sys.argv[1] == "resize_images" and sys.argv[2].isdigit():
        resize_images(int(sys.argv[2]))
    else:
        print("not a function")