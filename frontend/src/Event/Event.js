import React,{useState, useEffect} from "react";
const Event = () => {
  const [loadedEvent, setLoadedEvent] = useState([]);
  const [error, setError] = useState("");

  


  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await fetch(`http:localhost:4000/api/event/get`);
        const resBody = await response.json();
        setLoadedEvent(resBody);
        
        if (!response.ok) {
          throw new Error("Could net get list of users !! ");
        }
      } catch (err) {
        setError(err.message);
  console.log(err.message)
      }
    };
    loadPage();
  }, []);


  console.log(loadedEvent)
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="text-4xl  font-semibold text-center">Your Events</div>
        <div className="min-h-[300px]">
          {/* fetch cards of events */}
          <div className="grid gap-4 grid-cols-4 ">
            <div className="col-span-1 min-h-[200px] border-black border-2 mt-6"></div>
            <div className="col-span-1 min-h-[200px] border-black border-2 mt-6"></div>
            <div className="col-span-1 min-h-[200px] border-black border-2 mt-6"></div>
          </div>
        </div>
        <div className="text-4xl font-semibold text-center">All Events</div>
        <div>
          {/* fetch all cards */}
  
          <div className="grid gap-4 grid-cols-4 ">
          {loadedEvent.map((x,id) => (
        <div key={id}>
        <div className="col-span-1 min-h-[200px] border-black border-2 mt-6">
        {loadedEvent.map((x,id) => (
        <div key={id}>
            <div className=" bg-white min-h-20 p-5 flex hover:scale-105 hover:shadow-lg duration-300 ease-out">

              <div>
                <h1 className="block text-3xl font-bold capitalize text-gray-600">
                  {x.name}
                </h1>
                <p className="block text-xl capitalize text-gray-600">
                  Desc : {x.desc}
                </p>
              </div>
            </div>
        </div>
      ))}
        </div>
        </div>
      ))}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
