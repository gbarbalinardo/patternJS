function calculateBestPattern(images){

    function combine(images){
        for(k=images.length-1;k>0;k--){
            ca = 0;
            //Look for the best
            for (var i=k-1; i>=0; i--){
                aRight = Math.pow(images[i].r,2)/images[k].r *images[i].a/images[i].r;
                if (Math.pow(images[k].a-aRight,2)<Math.pow(images[k].a-ca,2)){
                  ca = aRight;
                  ci = i;
                  isRight = true;
                }  
                aDown = images[k].r *images[i].a/images[i].r;
                if (Math.pow(images[k].a-aDown,2)<Math.pow(images[k].a-ca,2)){
                  ca = aDown;
                  ci = i;
                  isRight = false;
                }  
                //console.log("i:"+i+", aright:"+aRight+", adown:"+aDown );
            }
            //print the chosen area
            //console.log ("closest a: " + ca + ", closest i: "+ ci +" isRight :"+isRight);
            rand = Math.random();
                
            if(isRight){
                zoom = Math.sqrt(images[ci].a*images[ci].r/(images[k].a*images[k].r));
                z1 = Math.sqrt(zoom);
                z2 = 1/Math.sqrt(zoom);


                images[k].a = images[k].a*Math.pow(z1,2);
                resizeChildren(images[k].div, z1);

                images[ci].a = images[ci].a*Math.pow(z2,2);
                resizeChildren(images[ci].div, z2);
                //change later        
                images[ci].div.style.display = "inline-block";
                images[k].div.style.display = "inline-block";
                console.log(rand);
                if(rand>.5) images[k].div.style.position = "absolute";
                else images[ci].div.style.position = "absolute";
                //white-space: nowrap
                //update the combined div
                ratio = images[ci].r*images[k].r/(images[ci].r+images[k].r);
                priority = (images[ci].p+images[k].p)/2.0;
            }
            else{
                //Update the placed div
                zoom = Math.sqrt(images[ci].a*images[k].r/(images[k].a*images[ci].r));

                z1 = Math.sqrt(zoom);
                z2 = 1/Math.sqrt(zoom);


                images[k].a = images[k].a*Math.pow(z1,2);
                resizeChildren(images[k].div, z1);

                images[ci].a = images[ci].a*Math.pow(z2,2);
                resizeChildren(images[ci].div, z2);


                //update the combined div
                ratio = images[ci].r+images[k].r;
                priority = (images[ci].p+images[k].p)/2.0;   
            }
            divBox = document.createElement("div");
            var div1 = images[ci].div.cloneNode(true);
            var div2 = images[k].div.cloneNode(true);
            if (rand>.5){
                divBox.appendChild(div1);
                divBox.appendChild(div2);
            }
            else{
                divBox.appendChild(div2);
                divBox.appendChild(div1);
            }

            area = images[k].a+images[ci].a;
            imgpush = { r : ratio, div: divBox, p: priority, a: area};
         
            divBox.style.width = Math.round(Math.sqrt(area/ratio))+"px";
            //console.log(Math.sqrt(area/ratio));
            divBox.style.height = Math.round(Math.sqrt(area*ratio))+"px";
            //changelater
            divBox.style.display = "block";
            divBox.style.float = "left";
            for (var i=k-1;i>=0; i--){
                if (images[i].a>imgpush.a){
                    break;
                }
            }
            images.splice(i+1, 0, imgpush);
            images.splice(ci+1, 1);//TODO: Check why there is +1
            images.splice(k,1);
        }
        return images;
    }


    function resizeChildren(divv, zoom){
        divs = divv.getElementsByTagName("*");
        //if(divs.length==0){
            //console.log(divv);
            var h = parseFloat(divv.style.height,10);
            //console.log(divv.style.height);
            
            var w = parseFloat(divv.style.width,10);
            //console.log(divv.style.width);
            if(h!=0){
                divv.style.height = Math.round(h*zoom)+"px";
                divv.style.width = Math.round(w*zoom)+"px";
            }
        //}
        for (j = 0; j<divs.length ; j++) {
            hh = parseFloat(divs[j].style.height,10);
            ww = parseFloat(divs[j].style.width,10);
            if(hh!=0){
                divs[j].style.height = Math.round(hh*zoom)+"px";
                divs[j].style.width = Math.round(ww*zoom)+"px";
            }
        }
        return h*w;
    }




    imgs = combine(images);
    return imgs;

}