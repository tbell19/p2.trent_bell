class Box{

  constructor(name,x,y,width,height){
    this.name = name
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.elements = []
    this.held = false
    this.destroy = false
    this.editMode = false
    this.hasFocus = false
  }
  
  draw(){
    if(this.editMode == true){
      fill(255,255,255);
      rect(this.x,this.y,this.w,this.h+40,10);
      fill(0,0,0);
      rect(this.x+2,this.y+44,this.w-4,this.h-6,0,0,8,8);
      rect(this.x+2,this.y+2,this.w-4,40,8,8,0,0);
      fill(255,255,255);
      textSize(32);
      text('X', this.x+(this.w-32),this.y+32);
    }else{
      
    }
    textSize(22);
    textAlign(LEFT)
    if(this.editMode){
      text(this.name,this.x+4,this.y+32)
    }
    for(var x in this.elements){
      this.elements[x].draw()
    }
    
    this.currOffsetX = mouseX - this.x + 2
    this.currOffsetY = mouseY - this.y + 44
 
  }
  
  
  checkClick(){
    if(this.editMode){
        if(!mouseIsPressed && this.held == true){this.held = false; saveData()}
        
        if(this.held || mouseIsPressed && mouseX > this.x && mouseX < this.x + this.w -40 &&
            mouseY > this.y && mouseY < this.y + 40
          ){
            this.held = true
          
              this.x =  movedX + this.x
              this.y =  movedY + this.y
        }

        if(!this.held &&  mouseIsPressed && mouseX > this.x+this.w-40 && mouseX < this.x + this.w &&
          mouseY > this.y && mouseY < this.y + 40){
            this.destroy = true
          }


    }
    var x
    for(x in this.elements){
      if(this.elements[x] instanceof boxButton){
        this.elements[x].checkClick()
      }
    }


    if(mouseIsPressed && mouseX > this.x && mouseX < this.x+4 + this.w && mouseY>this.y && mouseY < this.y+this.h+44){
      return true
    }else{
      return false
    }
  }
  
  text(text,size,x,y,textAlign = LEFT){
    this.elements[this.elements.length] = new boxText(this,this.elements.length,text,size,x,y,textAlign);
    return this.elements[this.elements.length-1]
  }

  rect(x,y,w,h,tl,tr,br,bl){
    this.elements[this.elements.length] = new boxRect(this,this.elements.length,x,y,w,h,tl,tr,br,bl);
    return this.elements[this.elements.length-1]
  }

  img(img,x,y){
    this.elements[this.elements.length] = new boxImg(this,this.elements.length,img,x,y);
    return this.elements[this.elements.length-1]
  }

  button(text,size,callback,x,y){
    this.elements[this.elements.length] = new boxButton(this,this.elements.length,text,size,callback,x,y);
    return this.elements[this.elements.length-1]
  }
}


class boxText{
  constructor(box,id,text,size,x,y,textAlign = LEFT){
    this.box = box
    this.text = text
    this.size = size
    this.x = x
    this.y = y
    this.id = id
    this.textAlign = textAlign
    return this
  }
  
  draw(){
      fill(255,255,255)
      textSize(this.size)
      textAlign(this.textAlign)
      text(this.text,this.box.x+this.x,this.box.y+this.y+40)
  }
}

class boxRect{
  constructor(box,id,x=null,y=null,w=null,h=null,tl=null,tr=null,br=null,bl=null){
    this.box = box
    this.x = x
    this.y = y
    this.h = h
    this.w = w
    this.tl = tl
    this.tr = tr
    this.br = br
    this.bl = bl
    this.id = id
    return this
  }

  draw(){
    fill(255,255,255)
    rect(this.x+this.box.x, this.y+this.box.y+40, this.w, this.h, this.tl, this.tr, this.br, this.bl)
  }
}

class boxImg{
  constructor(box,id,img,x,y){
    this.box = box;
    this.id = id;
    this.img = img;
    this.x = x;
    this.y = y;
  }

  draw(){
    image(this.img,this.x+this.box.x,this.y+this.box.y+40)
  }

}

class boxButton{
  constructor(box,id,text,size,callback,x,y){
    this.box = box;
    this.id = id;
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = size;
    this.callback = callback;
    this.hover = false;
    this.pressed = false;
  }

  draw(){




    textSize(this.size)
    var asc = textAscent()*0.8 +4


    if(mouseX > this.x+this.box.x-2 && mouseX < this.x+this.box.x-2+textWidth(this.text)+14 &&
      mouseY > this.y+this.box.y+44+asc*2 && mouseY < this.y+this.box.y+42+asc*2 + asc+4
    ){
      this.hover = true
    }else{
      this.hover = false
    }
    if(this.hover){fill(0,0,0)}else{fill(255,255,255)}
    rect(this.x+this.box.x-2,this.y+this.box.y+42+asc*2,textWidth(this.text)+14,asc+4,(asc/2)+2,(asc/2)+2,(asc/2)+2,(asc/2)+2)
    if(this.hover){fill(255,255,255)}else{fill(0,0,0)}
    rect(this.x+this.box.x,this.y+this.box.y+44+asc*2,textWidth(this.text)+10,asc,asc/2,asc/2,asc/2,asc/2)
    if(this.hover){fill(0,0,0)}else{fill(255,255,255)}
    text(this.text,this.box.x+this.x+5,this.box.y+this.y+40+asc*3)
  }

  checkClick(){
    if(mouseIsPressed && this.hover){
        if(this.pressed == false){
        console.log("button pressed")
        this.callback()
        }
        this.pressed = true
    }else{
      this.pressed = false
    }
  }
}