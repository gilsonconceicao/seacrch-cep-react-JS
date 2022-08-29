import React, { useEffect, useState } from 'react'
//icons 
import { BiSearch } from 'react-icons/bi'; 
import {AiFillGithub} from 'react-icons/ai'; 
import {FaLinkedinIn} from 'react-icons/fa'
// styles
import styles from './SearchCep.module.css';
// request api 
import api from '../services/api';
//components

const SearchCep = () => {
    //data 
    const [data, setData] = useState({});
    // value input
 const [cep, setNumberCep] = useState('');
    //loading
 const [loading, setLoading] = useState(false); 
    //error 
 const [error, setError] = useState(null); 

    //request 
    
 const handleGetCepData = async (e) => {
    e.preventDefault();

    if (cep == '') {
        setError('Insira um dado para prosseguir') 
        return
    }
    setLoading(true)
      try {
        const response = await api.get(`${cep}/json`); 
        setData(response.data);
        setError('');
        setNumberCep('');  
    } catch (error) {
        setError(`Erro no cep ou não inserido. Tente novamente!`)
        setNumberCep('')
    }
        setLoading(false) 
}


    return (
        <div>
            <div className={styles['container_form']}>
                <h2>Searh CEP</h2>
                <form onSubmit={handleGetCepData}>
                    <input
                        className={styles['input_value_cep']}
                        type="text"
                        value={cep}
                        placeholder='Digite um cep...'
                        onChange={(e) => setNumberCep(e.target.value)}
                    /> 
                    <button><BiSearch/></button>
                </form>
                <div className={styles['list_icon_redes']}>
                    <ul>
                        <li><a href="https://github.com/gilsonconceicao" target='_blank'> <AiFillGithub/> </a></li>
                        <li><a href="https://www.linkedin.com/in/gilson-conceicao/" target='_blank'> <FaLinkedinIn/> </a></li>
                    </ul>
                </div>
                {loading && <h4>Carregando...</h4>}
                {error && <h4 className={styles['message_error']}>{error}</h4>}
            </div>

            
          {Object.keys(data).length > 0 && (
           <div className={styles['container_response']}>
               <div className={styles['data_response_api']}>
                    <h2>CEP: {data.cep}</h2>
                    <span>Rua: {data.logradouro}</span>
                    <span>Bairro: {data.bairro}</span>
                    <span>Cidade: {data.localidade} - {data.uf}</span>
                </div>
            </div>
            )
            }
            
        </div>
    )
}

export default SearchCep