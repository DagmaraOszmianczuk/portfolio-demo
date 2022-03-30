import React, { useState } from "react"
import "./gallery.scss"
import { useStaticQuery, graphql } from "gatsby"
import useTags from "../../hooks/useTags"
import GalleryFullScreen from "../galleryFullScreen/galleryFullScreen"

const Gallery = (props) => {
   const data = useStaticQuery(graphql`
      query getGalleryData {
         allContentfulImages {
            nodes {
               title
               tags
               description
               image {
                  gatsbyImageData(layout: FIXED, width: 800)
                  id
               }
            }
         }
         allContentfulImagesTags {
            nodes {
               name
               id
            }
         }
      }
   `)

   const [tags, toggleTag, getActiveTags] = useTags(data.allContentfulImagesTags.nodes)
   const [galleryIsOpen, setGalleryIsOpen] = useState(true)

   return (
      <section className="gallery">
         <div className="container">
            <div className="header">
               <h2>Portfolio</h2>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit consequuntur voluptatem
                  laudantium mollitia ipsam
               </p>
               <ul>
                  {tags.map((node) => {
                     return (
                        <li
                           key={node.id}
                           onClick={() => toggleTag(node.id)}
                           className={node.active ? "active" : "inactive"}
                        >
                           {node.name}
                        </li>
                     )
                  })}
               </ul>
            </div>
            <div className="content">
               {data.allContentfulImages.nodes.map((node) => {
                  if (tags[0].active || getActiveTags().includes(...node.tags)) {
                     return (
                        <div className="img-wrapper" onClick={() => setGalleryIsOpen(true)}>
                           <img src={node.image.gatsbyImageData.images.fallback.src} alt="im" key={node.image.id} />
                           <div className="img-description">
                              <h1>{node.title}</h1>
                              <p>{node.description}</p>
                           </div>
                        </div>
                     )
                  }
                  return null
               })}
            </div>
         </div>

         <GalleryFullScreen
            isOpen={galleryIsOpen}
            setIsOpen={setGalleryIsOpen}
            images={data.allContentfulImages.nodes}
         />
      </section>
   )
}

export default Gallery
