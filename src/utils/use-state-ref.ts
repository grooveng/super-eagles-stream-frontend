import { useRef, useState } from 'react';

function useStateRef(value: boolean): any {
	const [state, setState] = useState(value);
	const ref = useRef(state);

	const setStateRef = (value: boolean) => {
		setState(value);
		ref.current = value;
	};

	return { ref, state, setStateRef };
}

export default useStateRef;
