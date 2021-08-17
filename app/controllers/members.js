const { age, date } = require('../..')

const member = require('../model/member')

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
            calback(members) {
              const pagination = {
                  filter,
                  total: math.ceil(members[0].total / limit), 
                  page
              }
              return res.render("members/index", { members, pagination, filter})
            }
        }
        member.paginate(params)


    },
    create(req, res){

        member.instructorsSelectOptions(function(options) {
            return res.render('members/create', {instructorOptions: options})
        })

    },
    post(req, res){

        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
        
        member.create(req.body,function(member) {
            return res.redirect(`/members/${members.id}`)
        })


    },
    show(req, res){
       member.find(req.params,id, function(members) {
         if(!member) return res.send("Instructor not found!")

         member.birth = date(member.birth).birthDay

         return res.render("members/show", { member })
     })

    },
    edit(req, res){
        
        member.find(req.params,id, function(members) {
            if(!member) return res.send("Instructor not found!")

            member.birth = date(member.birth).iso

            member.instructorsSelectOptions(function(options) {
                return res.render('members/edit', {member, instructorOptions: options})
            })

     })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

       member.update(req.body, function() {
           return res.redirect(`/members/${req.body.id}`)
       })
    },
    delete(req, res){
        member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })
    },
}
