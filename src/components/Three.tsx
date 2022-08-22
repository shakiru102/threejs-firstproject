// import { Html } from "@react-three/drei"

import { Environment, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { angleToRadian } from "../utils"
import * as THREE from 'three'
import gsap from "gsap"
import AoMapTexture from '../assets/coast_sand_rocks_02_2k/textures/coast_sand_rocks_02_ao_2k.jpg'
import MapTexture from '../assets/coast_sand_rocks_02_2k/textures/coast_sand_rocks_02_diff_2k.jpg'
import DisplacementTexture  from '../assets/coast_sand_rocks_02_2k/textures/coast_sand_rocks_02_disp_2k.png'
import BallMapTexture from '../assets/running_track_2k/textures/running_track_diff_2k.jpg'


const Three = () => {

    const { aopMapTexture, mapTexture, displacementTexture, ballMapTexture } = useTexture({
        mapTexture: MapTexture,
        aopMapTexture: AoMapTexture,
        displacementTexture: DisplacementTexture, 
        ballMapTexture: BallMapTexture
    })

    const  ballControlRef = useRef<any>(null)
    const orbitControlRef = useRef<any>(null)
    // useFrame((state) => {
    //    if(!!orbitControlRef.current){
    //     const { x, y } = state.mouse 
    //     orbitControlRef.current.setAzimuthalAngle(-x * angleToRadian(180))
    //     orbitControlRef.current.setPolarAngle((y + 1) * angleToRadian(45))
    //     orbitControlRef.current.update()
    //     // console.log(orbitControlRef.current);
    //    }
    // })

    useEffect(() => {
        gsap.to(ballControlRef.current.position, {
            y: 3,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
           })
           gsap.to(ballControlRef.current.rotation, {
            y: 3,
            x: 3,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
           })
        console.log(ballControlRef.current);
        console.log(orbitControlRef.current);
        
    },[])


  return (
    <>
    {/* Camera */}
    <PerspectiveCamera makeDefault position={[0, 5, 10]} />
    <OrbitControls enableZoom={false}  maxPolarAngle={angleToRadian(75)} ref={orbitControlRef}/>
    {/* Ball */}
    <mesh position={[0, 0.45, 0]} scale={0.5} castShadow ref={ballControlRef}>
        <sphereGeometry args={[1, 32, 32]}  />
        <meshStandardMaterial
         color={'white'} 
         metalness={0.2} 
         roughness={0.8} 
         map={ballMapTexture}
         />
    </mesh>
    {/* Sun */}
    <mesh position={[-10, 7, -40]} scale={0.5} >
        <sphereGeometry args={[0.5,32, 32]}  />
        <meshStandardMaterial color={'white'}  />
    </mesh>
{/* Ground */}
    <mesh rotation={[-(angleToRadian(90)), 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]}  />
        <meshStandardMaterial 
        map={mapTexture}
        aoMap={aopMapTexture}
        side={THREE.DoubleSide}
        // displacementMap={displacementTexture}
        roughness={0.2}  
        metalness={0} />
    </mesh>
   {/* Ligthing */}
    <ambientLight args={["white", 0.3]} />
    <directionalLight args={["white", 0.3]} position={[0, 1, 0]} castShadow/>
    {/* <spotLight args={['white', 5, 3, 10, 5]} /> */}
{/* Enviroment */}
    <Environment background>
        <mesh scale={100}>
            <sphereGeometry args={[5, 32, 32]}  />
            <meshBasicMaterial color="#2266cc" side={THREE.BackSide}/>
        </mesh>
    </Environment>
    </>
  )
}

export default Three