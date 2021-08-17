const { age, date } = require('../../lib/utils')

const instructor = require('../model/instructor')


module.exports = {
    index(req, res){
        const { filter, pge, limit } = req.query

          page = page || 1
          limit = limit || 2
          let offset = limit * (page - 1)

          const params = {
              filter,
              page,
              limit,
              offset,
              calback(instructors) {

                const pagination = {
                    filter,
                    total: math.ceil(instructors[0].total / limit), 
                    page
                }
                return res.render("intructors/index", { instructors, pagination, filter})
              }
          }

          instructor.paginate(params)
    

    },
    create(req, res){
        return res.render('instructors/create')

    },
    post(req, res){

        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
        
        instructor.create(req.body,function(instructor) {
            return res.redirect(`/instructors/${instructors.id}`)
        })


    },
    show(req, res){
       instructor.find(req.params,id, function(instructors) {
         if(!instructor) return res.send("Instructor not found!")

         instructor.age = age(instructor.birth)
         instructor.services = instructor.services.split(",")

         instructor.create_at = date(instructor.created_at).format

         return res.render("instructors/show", { instructor })
     })

    },
    edit(req, res){
        
        instructor.find(req.params,id, function(instructors) {
            if(!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
     })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

       instructor.update(req.body, function() {
           return res.redirect(`/instructors/${req.body.id}`)
       })
    },
    delete(req, res){
        instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    },
}
