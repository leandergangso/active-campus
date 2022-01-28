import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  let domNode = useRef()

  useEffect(() => {
    const maybeHandler = (evt) => {
      if (!domNode.current.contains(evt.target)) {
        handler()
      }
    }
    document.body.addEventListener('mousedown', maybeHandler);
    return () => document.body.removeEventListener('mousedown', maybeHandler)
  })

  return domNode
}

const OutsideClickWrapper = ({children, onOutsideClick}) => {
  let domNode = useClickOutside(() => {
    onOutsideClick()
  })

	return (
		<div ref={domNode}>
			{children}
		</div>
	);
};

export default OutsideClickWrapper;
