//make and export scene

import * as THREE from 'three';

 import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
 //  const VRButton= await import( 'https://cdn.jsdelivr.net/npm/three@v0.163.0/examples/jsm/webxr/VRButton.js');
  //  const XRControllerModelFactory= await import( 'https://cdn.jsdelivr.net/npm/three@v0.163.0/examples/jsm/webxr/XRControllerModelFactory.js');
  // const createText= await import( 'https://cdn.jsdelivr.net/npm/three@v0.163.0/examples/jsm/webxr/Text2D.js');

let result;
try { result= typeof BoxLineGeometry;}
catch(err){ result= err; }
let t= document.createElement('div');
t.innerHTML= result+" salt";
document.body.appendChild( t);

export function testFn(){return result+" zalt";}

/*
      let camera, scene, raycaster, renderer;
      let controller1, controller2;
      let controllerGrip1, controllerGrip2;

      let room, marker, floor, baseReferenceSpace;
      let runner, testLight, testText;
      let cFrame, cScreen, cPlane;

      function d(n){
        return ()=>{
          return Math.floor( Math.random()* n +1 );
        };
      }
      const d20= d(20); 

      let INTERSECTION;
      const tempMatrix = new THREE.Matrix4();

//init  and animate calls bumped upstream

    export  function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x104030 );

        camera = new THREE.PerspectiveCamera( 
            50, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set( 0, 1, 3 );

        room = new THREE.LineSegments(
            new BoxLineGeometry( 5, 5, 5, 5, 4, 3 ).translate( 0, 2.5, 0 ),
            new THREE.LineBasicMaterial( { color: 0xbc44bc } )
          );
        scene.add( room );

			  	runner = new THREE.Mesh( 
            new THREE.CapsuleGeometry( .1, .2, 3, 5).rotateZ(3.14/2).translate( -.1, 1.5, -.2),
            	new THREE.MeshBasicMaterial( {color: 0x330099, wireframe: true} ) 
          );
			  	scene.add( runner );

			  	testLight = new THREE.Mesh( 
            new THREE.BoxGeometry( .1, .1, .1 ).translate( .3, 1.55, -.3 ),
            new THREE.MeshBasicMaterial( {color: 0x777777} ) );
		  		scene.add( testLight );

        testText= createText( d20(), .3 );
        testText.rotateX(- .7 );
        testText.position.z= -.75;
        testText.position.y= 1;
        scene.add( testText );

                               
        scene.add( new THREE.HemisphereLight( 0xa5a5a5, 0x898989, 3 ) );

        const light = new THREE.DirectionalLight( 0xffffff, 3 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );

        marker = new THREE.Mesh(
            new THREE.CircleGeometry( 0.25, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0xbcbcbc } )
          );
        scene.add( marker );

        floor = new THREE.Mesh(
            new THREE.PlaneGeometry( 4.8, 4.8, 2, 2 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0x2222bc, transparent: true, opacity: 0.25 } )
          );
        scene.add( floor );

        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.xr.addEventListener( 'sessionstart', 
          () => baseReferenceSpace = renderer.xr.getReferenceSpace() 
          );
        renderer.xr.enabled = true;

        document.body.appendChild( renderer.domElement );
        document.body.appendChild( VRButton.createButton( renderer ) );


        // controllers

        function onSelectStart() {
          this.userData.isSelecting = true;
          // Highlight runner
          if( runner.userData.isSelecting == true ) {
           runner.material.color.setHex( 0x44aa44 );
          } else {
            runner.material.color.setHex( 0x4444aa );
          }
        }

        function onSelectEnd() {
          this.userData.isSelecting = false;
          if( runner.userData.isSelecting === true ){
            // capsule purple
            runner.material.color.setHex( 0xcc22cc );
            // cube red
            testLight.material.color.setHex( 0xdd5555 );
            cScreen.remove( cPlane );
            cPlane= createText( d20()+" enough text to overwrite the box + a whole bunch more like lorem ipsum habet scit. fiat fakit quid que quorum. a bit more still as I really want to what happens if i exceed the length of the room or viewport. i don't know how long that needs or if //n will do anything hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", .03 );
            cPlane.position.z+= .02;
            cScreen.add( cPlane );
          } 

          if ( INTERSECTION ) {
            const offsetPosition = { 
                x: - INTERSECTION.x, y: - INTERSECTION.y, z: - INTERSECTION.z, w: 1 
              };
            const offsetRotation = new THREE.Quaternion();
            const transform = new XRRigidTransform( offsetPosition, offsetRotation );
            const teleportSpaceOffset = baseReferenceSpace.getOffsetReferenceSpace( transform );

            renderer.xr.setReferenceSpace( teleportSpaceOffset );
          }
        }

        controller1 = renderer.xr.getController( 0 );
        controller1.addEventListener( 'selectstart', onSelectStart );
        controller1.addEventListener( 'selectend', onSelectEnd );
        controller1.addEventListener( 'connected', function ( event ) {
            this.add( buildController( event.data ) );
          } );
        controller1.addEventListener( 'disconnected', function () {
            this.remove( this.children[ 0 ] );
          } );
        scene.add( controller1 );

        controller2 = renderer.xr.getController( 1 );
        controller2.addEventListener( 'selectstart', onSelectStart );
        controller2.addEventListener( 'selectend', onSelectEnd );
        controller2.addEventListener( 'connected', function ( event ) {
            this.add( buildController( event.data ) );
          } );
        controller2.addEventListener( 'disconnected', function () {
            this.remove( this.children[ 0 ] );
          } );
        scene.add( controller2 );


        // The XRControllerModelFactory will automatically fetch controller models
        // that match what the user is holding as closely as possible. The models
        // should be attached to the object returned from getControllerGrip in
        // order to match the orientation of the held device.

        const controllerModelFactory = new XRControllerModelFactory();

        controllerGrip1 = renderer.xr.getControllerGrip( 0 );
        controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
        scene.add( controllerGrip1 );

        controllerGrip2 = renderer.xr.getControllerGrip( 1 );
        controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
        scene.add( controllerGrip2 );

// consoleVR

        cFrame = new THREE.Mesh(
            new THREE.BoxGeometry( .1, .1, .01 ),
            new THREE.MeshPhongMaterial( {color: 0x229933} ) );
        controllerGrip1.add( cFrame );

        cScreen= new THREE.Mesh(
            new THREE.BoxGeometry( .08, .06, .001).translate( 0, .01, .01),
            new THREE.MeshBasicMaterial( {
                color: 0x110011,
                wireframe: false
            })
          );
        cFrame.add( cScreen );
        cFrame.rotateX( -1.67 );
        cFrame.position.y+= .04;
        cFrame.position.z+= .11;

        cPlane= createText( d20(), .1 );
        cPlane.position.z+= .02;
        cScreen.add( cPlane );

        //
        window.addEventListener( 'resize', onWindowResize, false );
      }

      function buildController( data ) {
        let geometry, material;

        switch ( data.targetRayMode ) {
          case 'tracked-pointer':
            geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', 
              new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 2 ], 3 ) 
              );
            geometry.setAttribute( 'color', 
              new THREE.Float32BufferAttribute( [ 0.5, 0.2, 0.5, 0, 0, 0 ], 3 ) 
              );
            material = new THREE.LineBasicMaterial( { 
                vertexColors: true, blending: THREE.AdditiveBlending 
              } );
            return new THREE.Line( geometry, material );

          case 'gaze':
            geometry = new THREE.RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
            material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
            return new THREE.Mesh( geometry, material );
        }
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
      }

      //

    export  function animate() {
        renderer.setAnimationLoop( render );
      }

      function render() {
        INTERSECTION = undefined;

        if ( controller1.userData.isSelecting === true ) {
          tempMatrix.identity().extractRotation( controller1.matrixWorld );

          raycaster.ray.origin.setFromMatrixPosition( controller1.matrixWorld );
          raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

          const intersects = raycaster.intersectObjects( [ floor ] );

          if ( intersects.length > 0 ) {
            INTERSECTION = intersects[ 0 ].point;
          }
        } else if ( controller2.userData.isSelecting === true ) {
          tempMatrix.identity().extractRotation( controller2.matrixWorld );

          raycaster.ray.origin.setFromMatrixPosition( controller2.matrixWorld );
          raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

          const intersects = raycaster.intersectObjects( [ floor, runner ] );

          if ( intersects.length > 0 ) {
            if( intersects[0].object === runner ){
              runner.userData.isSelecting= true;
            } else {
              runner.userData.isSelecting= false;
              INTERSECTION = intersects[ 0 ].point;
            }
          }
        }

        if ( INTERSECTION ) marker.position.copy( INTERSECTION );

        marker.visible = INTERSECTION !== undefined;

        renderer.render( scene, camera );
      }
*/

