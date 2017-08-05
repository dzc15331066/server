const mongoose = require('mongoose');


const IndividualSchema = mongoose.Schema({
    userType:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email_or_phone:{
        type: String,
        required: true
    },
    realName:{
        type: String,
        required: true
    },
    schoolName:{
        type: String,
        required: false
    },
    schoolAddress:{
        type: String,
        required: false
    },
    grade:{
        type: String,
        required: false
    }
});

const AssociationSchema = mongoose.Schema({
    userType:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email_or_phone:{
        type: String,
        required: true
    },
    schoolName:{
        type: String,
        required: true
    },
    schoolAddress:{
        type: String,
        required: true
    }
});

const MeetingSchema = mongoose.Schema({
    userType:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email_or_phone:{
        type: String,
        required: true
    },
    meetingName:{
        type: String,
        required: true
    },
    meetingAddress:{
        type: String,
        required: true
    }
});

module.exports = {
    individual:mongoose.model('individual',IndividualSchema),
    association:mongoose.model('association',AssociationSchema),
    meeting:mongoose.model('meeting',MeetingSchema),
}
