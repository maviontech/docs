import pymupdf, glob, os
from PIL import Image, ImageDraw
R="D:/MavionTech_sales_MavionTech_Transformation/02_Working_Notes/renders"; O="D:/MavionTech_sales_MavionTech_Transformation/04_Contact_Sheets"
for pdf in sorted(glob.glob(R+"/*.pdf")):
    doc=pymupdf.open(pdf); name=os.path.basename(pdf)[:-4]
    ims=[]
    for p in doc:
        pix=p.get_pixmap(matrix=pymupdf.Matrix(0.5,0.5)); ims.append(Image.frombytes('RGB',(pix.width,pix.height),pix.samples))
    tw,th=480,270; cols=4
    for part in range(0,len(ims),16):
        chunk=ims[part:part+16]; rows=(len(chunk)+cols-1)//cols
        S=Image.new('RGB',(cols*tw,rows*(th+18)),'white'); d=ImageDraw.Draw(S)
        for i,im in enumerate(chunk):
            im=im.resize((tw-6,th-6)); x=(i%cols)*tw; y=(i//cols)*(th+18)
            S.paste(im,(x+3,y+18)); d.text((x+4,y+3),f"S{part+i+1}",fill='red')
        fn=f"Deck_{name}_{part//16+1}.jpg"; S.save(os.path.join(O,fn),quality=80); print(fn,len(doc))
