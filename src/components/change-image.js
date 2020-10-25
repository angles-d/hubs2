const oldWorldPos=new THREE.Vector3();
const newWorldPos=new THREE.Vector3();
var entity;
var num=1;
const max=50;
const min=1;
//var distance=0;

AFRAME.registerComponent('change-image', {
    schema: {
    },
    init:function(){
        var cameraEl = this.el.sceneEl.camera.el;
        oldWorldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
        console.log("WTF");
        entity= document.querySelector('#pic');
    },
    log : function () {
        console.log("NEW:"+newWorldPos.x.toFixed(2) +"  OLD:"+oldWorldPos.x.toFixed(2)+"\nGREATER:"+(newWorldPos.x>oldWorldPos.x));
    },
    tick: function () { 
        var cameraEl = this.el.sceneEl.camera.el;
        newWorldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);

        if (!(newWorldPos.x<=oldWorldPos.x)&&num<max) {
            num++;
            var url="#test"+num;
            AFRAME.utils.entity.setComponentProperty(entity, 'material.src',url);
        }else if(!(newWorldPos.x>=oldWorldPos.x)&&num>min){
            num--;
            var url="#test"+num;
            AFRAME.utils.entity.setComponentProperty(entity, 'material.src',url);
        }
        //console.log(num);
        oldWorldPos.copy(newWorldPos);   
    }

});
  