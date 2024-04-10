const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  video:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video"
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true});

//add plugin to enable pagination for aggregation queries

commentSchema.plugin(mongooseAggregatePaginate);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

// module.exports={
//     getComments:(query,page,limit)=>{
//         return new Promise((resolve,reject)=> {
//             //sort by date descending
//             query.sort({date:"desc"});

//            //run the aggregate with pagination
//            Comment.aggregatePaginate(query,{page: page , limit: limit}).then(result => {
//                resolve(result);
//            }).catch(err=>{
//                reject(err);
//            })
//         });

//      },

//      addComment:(userId,blogId,text)=>{
//           let comment = new Comment ({
//               user : userId,
//               blog : blogId,
//               text : text,
//               date : Date.now()
//           });
//           return comment.save();
//      }
// }
