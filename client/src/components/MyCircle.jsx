import { Fragment, useEffect, useRef } from "react";
import { Circle, Transformer } from "react-konva";

export function MyCircle({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragStart,
  onDragEnd,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
    }
  }, [isSelected]);

  return (
    <Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onDragStart={(e) => onDragStart(e, shapeProps.id)}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onDragEnd(e, shapeProps.id);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
}
