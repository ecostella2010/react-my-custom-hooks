import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {

    const isMounted = useRef( true );

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {
        //Cuando se desmonte va a mantener la referencia al mismo
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch  (url)
        .then( resp => resp.json () )
        .then( data => {

            if ( isMounted.current ){

                // setTimeout(() => {

                //         setState({
                //             loading: false,
                //             error: null,
                //             data
                //         });
                //     }, 4000
                // );

                setState({
                    loading: false,
                    error: null,
                    data
                });

            } 
            // else {
            //     console.log('setState no se llamó');
            // }
            
        })
        .catch( () =>{
            setState({ 
                data: null, 
                loading: false, 
                error: 'No se pudo carga la info' });
        })
        
    }, [url]);

    return state;

}
