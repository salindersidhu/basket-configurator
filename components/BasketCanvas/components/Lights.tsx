export function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[150, 250, 200]}
        intensity={1.4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-normalBias={0.035}
      />
      <directionalLight position={[-100, 100, -100]} intensity={0.3} />
      <hemisphereLight args={[0xcccccc, 0x333333, 0.4]} />
    </>
  );
}
