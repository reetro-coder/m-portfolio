function dotMoveEventHandler(e, containerRef, dotRef) {
  if (!containerRef.current || !dotRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  const offsetX = -dotRef.current.offsetLeft + (e.clientX - rect.left);
  const offsetY = -dotRef.current.offsetTop + (e.clientY - rect.top);
  dotRef.current.style.setProperty("--X", `${offsetX}px`);
  dotRef.current.style.setProperty("--Y", `${offsetY}px`);
}

export { dotMoveEventHandler };
