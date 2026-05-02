export function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[150, 250, 200]}
        intensity={1.4}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-100, 100, -100]} intensity={0.3} />
      <hemisphereLight args={[0xcccccc, 0x333333, 0.4]} />
    </>
  );
}
