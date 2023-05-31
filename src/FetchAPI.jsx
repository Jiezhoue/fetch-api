import { useEffect, useState } from "react"

export default function FetchAPI() {
  function randomNumber(){
    return Math.floor(Math.random()*30000)+30000
  }
  const [album, setAlbum] = useState([]);

  const url = 'https://deezerdevs-deezer.p.rapidapi.com/album/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '577990ecfemshcaf230c6fa2818dp1d2fa8jsn711963dcaf86',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  async function fetchAlbum (){
    try{
      const response = await fetch(url+randomNumber(), options)
      const data = await response.json();
      console.log(data)
      return data
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(()=> {
    const promises = []
    const fetchData = async () => {
      while (promises.length < 5){
        const promise = await fetchAlbum()
        console.log(promise)
        if(promise.error === undefined){
          promises.push(promise)
        }
      }
      const data = await Promise.all(promises);
      setAlbum(data)
    }
    fetchData()
  },[])

  return (
    <div>
    {console.log(album)}
      {album.map((album)=><p key={album.id}>
        <p>Alnum name: {album.title}, Artist name: {album.artist.name}</p>
        <img src={album.artist.picture_small} alt=""/>
        <img src={album.cover_medium} alt="" />
        {album.tracks.data.map((track)=><ul key={track.id}>
          <li>{track.preview}</li>
        </ul>)}
      </p>)}

    </div>
  )
}