function importPics(){
    var pictures = [];
    var images = [];
    pictures = document.getElementById("imgs1").getElementsByTagName('img');
    var totalArea = 0;
    for(i=0; i<pictures.length; i++) {
        width = pictures[i].clientWidth;
        ratio = pictures[i].clientHeight/width;
        priority = parseFloat(pictures[i].id);
        //box into a div
        var divBox = document.createElement("div");
        divBox.className = "imgdiv";
        divBox.style.backgroundImage = "url('"+pictures[i].src+"')";
        divBox.innerHTML = priority;
        divBox.style.backgroundRepeat = "no-repeat";
        divBox.style.backgroundSize = "100%";
        divBox.style.display = "block";
        divBox.style.float = "left";
        var imgpush = { w: width, r : ratio, div: divBox, p: priority ,a: width*width*ratio};    
        images.push(imgpush);
        totalArea += area(priority);
    }
    for(i=0; i<images.length; i++) {
        images[i].a = area(images[i].p)/totalArea*2000000;
        images[i].div.style.width = Math.round(Math.sqrt(images[i].a / images[i].r))+"px";
        images[i].div.style.height = Math.round(Math.sqrt(images[i].a * images[i].r))+"px";
    }
    return images;
}

function area(priority){
    return 1/priority;
}

function show(images,divv){
    div = document.createElement("div");
    for(i=0; i<images.length; i++){
        div.appendChild(images[i].div);
    }
    divv.appendChild(div);
}