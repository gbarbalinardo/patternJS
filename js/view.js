function createDiv(id, rect, obj, father) {
	var divTag = document.createElement("div"); 
    divTag.id = id;
    divTag.className = "mosaic-block bar2";
	divTag.style.width = Math.round(rect.w)+"px";
	divTag.style.height = Math.round(rect.h)+"px";
	divTag.style.position = "absolute"; 
	divTag.style.left = Math.round(rect.x)+"px"; 
	divTag.style.top = Math.round(rect.y)+"px";
    divTag.style.backgroundColor="white";
	//divTag.style.border = "solid";
    addImage(rect, obj, divTag);
	addDetails(divTag, obj, Math.round(rect.h));
    if (father!=0) father.appendChild(divTag);
    return divTag;
}


function staticSlides(structPath,images,fatherDiv){
	//console.log(str,images);
	var divTag;
	for (var i=0;(i<images.length); i++){
		//console.log(structPath.rectangle[i]);
		divTag=createDiv(i,structPath.rectangle[i],images[i],0);
	    if (fatherDiv==0) document.body.appendChild(divTag); 
	    else fatherDiv.appendChild(divTag);
	}
	fatherDiv.style.width=structPath.width+"px";
	fatherDiv.style.height=structPath.heigth+"px";
}


function createImpressDiv(id, rect, obj, father,zoom,opacity){
	var divTag = document.createElement("div"); 
	divTag.setAttribute("class", "step");
	divTag.setAttribute("data-x", Math.round(rect.x+rect.w/2));
	divTag.setAttribute("data-y", Math.round(rect.y+rect.h/2));
	//divTag.setAttribute("data-z",zoom);
	divTag.setAttribute("data-scale",zoom);
	//divTag.style.opacity = opacity;
	//divTag.setAttribute("href",'http://www.google.com');
	addLink(divTag,obj.url,'ondblclick');
	if(zoom==1){
		divTag.style.width = Math.round(rect.w)+"px";
		divTag.style.height = Math.round(rect.h)+"px";
	}
	else{
		divTag.style.width = Math.round(rect.w/zoom)+"px";
		divTag.style.height = Math.round(rect.h/zoom)+"px";
	}
	//divTag.style.border = "solid";
	//divTag.innerHTML ="dyn"+ html;
	//APPEND IMAGE
	var img= document.createElement("img");
	img.setAttribute('src', obj.picture.xl);
	img.style.position="absolute";
	if(zoom==1){
		img.style.width = Math.round(rect.w)+"px";
		img.style.height = Math.round(rect.h)+"px";
		img.style.left = 0 + 'px';
		img.style.top = 0 + 'px';
	}
	else{
		img.style.width = Math.round(rect.w/zoom)+"px";
		img.style.height = Math.round(rect.h/zoom)+"px";
		img.style.left = 0 + 'px';
		img.style.top = 0 + 'px';
	}
	divTag.appendChild(img);
	if (father==0){
		impressDiv=document.getElementById("impress");
		impressDiv.appendChild(divTag); 
	}
	else father.appendChild(divTag);

}


function dynamicSlides(structPath,images,father){
	var falseZoom=3;
	resizePath(structPath,images,falseZoom);
	var globalZoom=1;
	var finalZoom=1;
	globalZoom*=structPath.rectangle[0].h/document.height;
	finalZoom*=structPath.height/document.height;
	//console.log(globalZoom);
	var zoom=new Array();
	for (var i=0;i<images.length; i++){
		//alert(structPath.rectangle[i].x);
		if(i==0)zoom[i]=globalZoom;
		else{
			/*if (structPath.rectangle[i].h==structPath.rectangle[i-1].h)*/
			zoom[i]=structPath.rectangle[i].h/structPath.rectangle[i-1].h*zoom[i-1];
			//else zoom[i]=structPath.rectangle[i].w/structPath.rectangle[i-1].w*zoom[i-1];
		}	
		createImpressDiv("id"+i,structPath.rectangle[i],images[i],father,zoom[i],.3);
	}
	resizePath(structPath,images,1/falseZoom);
}


function addLink(divTag,url,event){
	divTag.setAttribute(event,'location.href="'+url+'";');
	console.log(url);
}


function addDetails(divTag,obj,height){
	var overlay=document.createElement("div");
	var details = document.createElement("div"); 
    divTag.className = "mosaic-block bar2"; 
    overlay.className = "mosaic-overlay";
    overlay.style.bottom = "-"+(height-75)+"px";//"-"+ Math.round(height*4.0/5.0) +"px";
    overlay.style.height = Math.round(height*1.0/2.5)+"px;";
    details.className = "details"; 
    details.innerHTML="<h4>"+obj.titolo+"</h4></br><p>"+obj.didascalia+"</p></br>";//+<p>"+obj.descrizione+"</p>";
	addLink(details,obj.url,'onclick');
    overlay.appendChild(details);
	divTag.appendChild(overlay);
}

function addImage(rect, obj, father){
	var img= document.createElement("img");
	var area=rect.w*rect.h;
	//console.log(area);
	img.setAttribute('src', obj.picture.xl);
	if (area<300000) {
		img.setAttribute('src', obj.picture.l);
		//console.log("l\n");
	}
	if (area<80000) {
		img.setAttribute('src', obj.picture.m);
		//console.log("m\n");
	}
	if (area<40000) {
		img.setAttribute('src', obj.picture.s);
		//console.log("s\n");
	}
	img.style.width = Math.round(rect.w)+"px";
	img.style.height = Math.round(rect.h)+"px";
	img.style.left = Math.round(0) + 'px';//it was rect.x
	img.style.top = Math.round(0) + 'px';//it was rect.y
	img.style.position = "relative";
	img.style.float = "left";
	//link added to image
	addLink(img,obj.url,'onclick');
	father.appendChild(img);
}

function createInterface(images){
	document.onmousemove = setMouseX;
	var main= document.getElementById("main");
	var father=document.getElementsByClassName("scroller")[0];
	setLateralBar(main,10,200);
	console.log(images);
	//var structPath=new createStructFromString("111",img);
	var path=createPathOldMethod(images);
	structPath=new createStructFromMultiString(path,images,main.offsetHeight-10);
	//resizePath(structPath,images,1);
	invertPath(structPath);
	addBorder(structPath,7,7);
	console.log(structPath);
	staticSlides(structPath,images,father);
}
