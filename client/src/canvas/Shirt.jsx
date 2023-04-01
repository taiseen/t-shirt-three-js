import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';
import state from '../store';


const Shirt = () => {

    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString}>

            <mesh
                castShadow
                dispose={null}
                material-roughness={1}
                material={materials.lambert1}
                geometry={nodes.T_Shirt_male.geometry}
            >

                {
                    snap.isFullTexture && (
                        <Decal
                            scale={1}
                            map={fullTexture}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        />
                    )
                }


                {
                    snap.isLogoTexture && (
                        <Decal
                            scale={0.15}
                            map={logoTexture}
                            depthTest={false}
                            depthWrite={true}
                            map-anisotropy={16}
                            rotation={[0, 0, 0]}
                            position={[0, 0.04, 0.15]}
                        />
                    )
                }

            </mesh>

        </group>
    )
}

export default Shirt