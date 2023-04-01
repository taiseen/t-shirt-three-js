import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useRef } from 'react'

const Backdrop = () => {

    const shadows = useRef();

    return (
        <AccumulativeShadows
            ref={shadows}
            temporal
            scae={10}
            frames={60}
            alphaTest={0.85}
            position={[0, 0, -0.14]}
            rotation={[Math.PI / 2, 0, 0]}
        >

            <RandomizedLight
                amount={4}
                radius={9}
                ambient={0.25}
                intensity={0.55}
                position={[5, 5, -10]}
            />

            <RandomizedLight
                amount={4}
                radius={5}
                ambient={0.55}
                intensity={0.25}
                position={[-5, 5, -9]}
            />

        </AccumulativeShadows>
    )
}

export default Backdrop