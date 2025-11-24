import { ChevronDown } from "lucide-react";


function Pactice() {


    const menuData = [
        {
          name: "Demo",
          items: [
            "Home 01",
            "Home 02",
            "Home 03",
            "Home 04",
            "Home 05",
            "Home 06",
            "Home 07",
            "Home 08",
            "Home 09",
            "Home 10",
            "Home 11",
            "Home 12",
          ],
        },
        {
          name: "Destinations",
          isMega: true,
          countries: [
            {
              name: "France",
              image:
                "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=80&h=60&fit=crop",
              cities: [
                {
                  name: "Lyon",
                  image:
                    "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?w=80&h=60&fit=crop",
                },
                {
                  name: "Marseille",
                  image:
                    "https://images.unsplash.com/photo-1595960133515-de6b3b2e4db7?w=80&h=60&fit=crop",
                },
                {
                  name: "Paris",
                  image:
                    "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=80&h=60&fit=crop",
                },
                {
                  name: "Toulouse",
                  image:
                    "https://images.unsplash.com/photo-1549924231-f129b911e442?w=80&h=60&fit=crop",
                },
              ],
            },
            {
              name: "Thailand",
              image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop",
              cities: [
                {
                  name: "Bangkok",
                  image:
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop",
                },
                {
                  name: "Chiang Mai",
                  image:
                    "https://images.unsplash.com/photo-1523492631270-c7cb03866dd5?w=80&h=60&fit=crop",
                },
                {
                  name: "Phuket",
                  image:
                    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=80&h=60&fit=crop",
                },
              ],
            },
            {
              name: "United Kingdom",
              image:
                "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop",
              cities: [
                {
                  name: "Birmingham",
                  image:
                    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop",
                },
                {
                  name: "Glasgow",
                  image:
                    "https://images.unsplash.com/photo-1486634279914-7c2e9e5fe092?w=80&h=60&fit=crop",
                },
                {
                  name: "London",
                  image:
                    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop",
                },
                {
                  name: "Manchester",
                  image:
                    "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=80&h=60&fit=crop",
                },
              ],
            },
            {
              name: "United States",
              image:
                "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=80&h=60&fit=crop",
              cities: [
                {
                  name: "Chicago",
                  image:
                    "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=80&h=60&fit=crop",
                },
                {
                  name: "Houston",
                  image:
                    "https://images.unsplash.com/photo-1575648362413-1f31c9d1c0be?w=80&h=60&fit=crop",
                },
                {
                  name: "Los Angeles",
                  image:
                    "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=80&h=60&fit=crop",
                },
                {
                  name: "New York City",
                  image:
                    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=80&h=60&fit=crop",
                },
              ],
            },
          ],
        },
        {
          name: "Tour Listing",
          items: [
            "Left Filter – Grid",
            "Left Filter – List",
            "Half Maps – List",
            "Half Maps – Grid",
            "Top Filter – List",
            "Top Filter – Grid",
            "Tour Detail – Layout 1",
            "Tour Detail – Layout 2",
            "Tour Detail – Layout 3",
            "Tour Detail – Layout 4",
            "Tour Detail – Layout 5",
            "Tour Detail – Layout 6",
          ],
        },
        {
          name: "Pages",
          items: [
            "City Detail – Layout 1",
            "City Detail – Layout 2",
            "City Detail – Layout 3",
            "About Us",
            "Contact Us",
            "Career",
            "FAQ's",
            "Teams",
            "Privacy Policy",
            "Blog",
          ],
        },
      ];
      


  return (
    <div className="mx-auto w-full px-8 py-2 bg-green-300 flex justify-between ">
        {/* navlefft &neVlist */}
        <div className="flex gap-4">
            <div>
                Logo
            </div>
            <div className="flex gap-2">
               
               {
                menuData.map((item,idx)=>(
                    <div className="flex group gap-1" key={idx} >
                        <div className=" relative  flex hover:cursor-pointer hover:text-orange-600 transition ease-out duration-1000" >
                        {item.name}
                        <ChevronDown />

                        </div>
                        {
                            item.isMega ? <div className="absolute opacity-0 scale-y-0 group-hover:scale-100  group-hover:opacity-100 h-[20vh] top-10 w-[70%] -translate-x-20 bg-red-300  transition-all ease-in-out duration-300 origin-bottom "> <div className="w-full flex justify-center items-center"> 1234</div>   </div> : <div className="absolute bg-green-100">123w</div>
                        }
                        
                    </div>
                ))
               }
            </div>

        </div>

        {/* nav-right $with Action */}
        <div>
            <button>button 1</button>
            <button>button 2</button>

        </div>
    </div>
  )
}

export default Pactice