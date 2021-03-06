import React,{Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios';

function App() {

  //definir el state 
  const [busquedaletra,guardarBusquedaLetra] = useState({});
  const [letra,guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  useEffect( () => {
    if(Object.keys(busquedaletra).length === 0) return;
    
    const consultarApiLetra = async () =>{

      const { artista, cancion} = busquedaletra;

      const url = `https://private-6e2f0e-lyricsovh.apiary-mock.com/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      
      const [info] = await Promise.all([
          //axios.get(url),
          axios.get(url2)
      ]);

      if(letra.data) guardarLetra(letra.data.lyrics);
      guardarInfo(info.data.artists[0]);

    }
    consultarApiLetra();
  }, [busquedaletra,info]);

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            ></Info>
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            ></Cancion>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
