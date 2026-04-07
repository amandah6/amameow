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
from PIL import Image

path = os.path.abspath("./static/bottlecaps/images")

def generate_md():
    obj = os.scandir(path)
    fd = os.open("bottlecaps_test.md", os.O_RDWR)
    count = 0
    for entry in obj:
        if entry.is_file():
            # check if filename is a number between 0-400,000
            filename = entry.name.split('.')[0]
            # check for hidden files, like .DS_Store
            if len(filename) > 0:
                count += 1
                s = '    - src: "/bottlecaps/images/' + entry.name + '"\n'
                # if filename is a number, cci id is known, add url
                if filename.isdigit() and int(filename) < 400000:
                    s += '      url: "https://crowncaps.info/caps/' + filename + '"\n'

                line = str.encode(s)
                os.write(fd, line)
    os.close(fd)
    print("there are " + str(count) + " bottlecaps")

def resize_caps():
    print(path)
    obj = os.listdir(path)
    for entry in obj:
        if entry[0] != '.':
            file = os.path.join(path, entry)
            with Image.open(file) as im:
                # scale to 100px width
                scale = im.width / 100
                (width, height) = (round(im.width // scale ), round(im.height // scale))
                
                # resize and save
                im_resized = im.resize((width, height), Image.LANCZOS)
                im_resized.save(file)

if __name__ == "__main__":
    import sys
    if sys.argv[1] == "generate_md":
        generate_md()
    elif sys.argv[1] == "resize_caps":
        resize_caps()
    else:
        print("not a function")