import os, sys, glob
from PIL import Image, ImageDraw, ImageFont
out="D:/MavionTech_sales_MavionTech_Transformation/04_Contact_Sheets"
def sheet(files, name, cols=4, tw=480, labels=None):
    th=int(tw*0.625)+24
    rows=(len(files)+cols-1)//cols
    S=Image.new('RGB',(cols*tw,rows*th),'white'); d=ImageDraw.Draw(S)
    try: f=ImageFont.truetype("arial.ttf",16)
    except: f=None
    for i,fp in enumerate(files):
        im=Image.open(fp).convert('RGB'); im.thumbnail((tw-8,th-30))
        x=(i%cols)*tw; y=(i//cols)*th
        S.paste(im,(x+4,y+24)); d.text((x+6,y+4),(labels[i] if labels else os.path.basename(fp)),fill='black',font=f)
    S.save(os.path.join(out,name),quality=85); print(name,len(files),S.size)
ag=sorted(glob.glob("D:/MavionTech_sales/Agastya_screenshots/*.png"))
for k in range(0,len(ag),20): sheet(ag[k:k+20],f"Agastya_screens_{k//20+1}.jpg")
sheet(sorted(glob.glob("D:/MavionTech_sales/screenshots/*.jpg")),"PragyanNxt_screens.jpg")
sheet(sorted(glob.glob("D:/MavionTech_sales/branding/*.png")),"Branding.jpg",cols=3)
