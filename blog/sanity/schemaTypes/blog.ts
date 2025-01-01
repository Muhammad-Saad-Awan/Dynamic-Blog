import { defineType,defineField } from "sanity";
export default defineType({
    name:"blog",
    title:"Blog",
     type:"document",
    fields:[
        defineField({
            name:"heading",
            title:"Title",
            type:"string"
        }),
        defineField({
            name:"description",
            title:"Description",
            type:"text"
        }),
        defineField({
            name:"image",
            title:"Image",
            type:"image",
            options:{
                hotspot:true
            }

        }),
        defineField({
            name:"slug",
            title:"Slug",
            type:"slug",
            options:{
                source:"heading",
                maxLength:200,}
        })
       

    ]
})