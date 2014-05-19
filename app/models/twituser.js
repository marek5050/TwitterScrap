var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;


var twitUserSchema = new Schema({
 	id: Number,
     id_str: String,
     name: String,
     screen_name: String,
     location: String,
     url: String,
     description: String,
     protected: Boolean,
     followers_count: Number,
     friends_count: Number,
     listed_count: Number,
     created_at: {type:Date, default:Date.now},
     favourites_count: Number,
     utc_offset: Number,
     time_zone: String,
     geo_enabled: Boolean,
     verified: Boolean,
     statuses_count: Number,
     lang: String,
     contributors_enabled: Boolean,
     is_translator: Boolean,
     is_translation_enabled: Boolean,
     profile_background_color: String,
     profile_background_image_url: String,
     profile_background_image_url_https: String,
     profile_background_tile: String,
     profile_image_url: String,
     profile_image_url_https: String,
     profile_banner_url: String,
     profile_link_color: String,
     profile_sidebar_border_color: String,
     profile_sidebar_fill_color: String,
     profile_text_color: String,
     profile_use_background_image: String,
     default_profile: String,
     default_profile_image: String,
     following: String,
     follow_request_sent: String,
     notifications: String,
   });

module.exports = mongoose.model('twitUserSchema', twitUserSchema);