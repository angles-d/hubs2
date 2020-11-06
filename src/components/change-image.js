var oldWorldPosZ=0.0;
var newWorldPos=new THREE.Vector3();
var newWorldPosZ=0.0;
var entity;
var num=1;
var curKey='=';
var sideName="txt-r";
var wtf="nada";

AFRAME.registerComponent('change-image', {
    schema: {
    },
    init:function(){
        var cameraEl = this.el.sceneEl.camera.el;
        entity= document.querySelector('#front-pic');
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"true");
    },
    log : function () {
        console.log("NEW:"+newWorldPosZ +"  OLD:"+oldWorldPosZ+"\nWTF:"+wtf+ " Num:"+num);
    },
    play: function () {
        this.data.timestamp = Date.now();
        this.log();
      },
    tick: function () { 
        var cameraEl = this.el.sceneEl.camera.el;
        newWorldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
        newWorldPosZ=newWorldPos.z.toFixed(2);
    
        if ((newWorldPosZ<oldWorldPosZ)&&(num<250)) {
            wtf="GREATER"
            num++;
            var url="#"+sideName+num;
            AFRAME.utils.entity.setComponentProperty(entity, 'material.src',url);
        }else if((newWorldPosZ>oldWorldPosZ)&&(num>1)){
            wtf="LESS"
            num--;
            var url="#"+sideName+num;
            AFRAME.utils.entity.setComponentProperty(entity, 'material.src',url);
        }
        //logger; once every second
        // if (Date.now() - this.data.timestamp > 1000) {
        //     this.data.timestamp += 1000;
        //     this.data.seconds += 1;
        //     this.log();
        // }  
        oldWorldPosZ=newWorldPosZ;
    
    }
});

window.addEventListener("keydown", function(e){
    if(e.key==curKey){
        return;
    }
    //front
    if(e.key == '=') { 
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"false");
        entity= document.querySelector('#front-pic');
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"true");
        curKey='=';
        sideName="txt-r";
    }
    //left
    if(e.key == '[') { 
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"false");
        entity= document.querySelector('#left-pic');
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"true");
        curKey='[';
        sideName="txt-r"

    }
    //right
    if(e.key == '\\') { 
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"false");
        entity= document.querySelector('#right-pic');
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"true");
        curKey='\\';
        sideName="txt-r"

    }
    //back
    if(e.key == ']') { 
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"false");
        entity= document.querySelector('#back-pic');
        AFRAME.utils.entity.setComponentProperty(entity,'visible',"true");
        curKey=']';
        sideName="txt-r"

    }
});

  