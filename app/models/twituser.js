var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;


var twitUserSchema = new Schema({
  created_at: String,
  notifications: Schema.Types.Mixed,
  follow_request_sent: Schema.Types.Mixed,
  following: Schema.Types.Mixed,
  default_profile_image: String,
  default_profile: String,
  profile_use_background_image: String,
  profile_text_color: String,
  profile_sidebar_fill_color: String,
  profile_sidebar_border_color: String,
  profile_link_color: String,
  profile_banner_url: String,
  profile_image_url_https: String,
  profile_image_url: String,
  profile_background_tile: String,
  profile_background_image_url_https: String,
  profile_background_image_url: String,
  profile_background_color: String,
  is_translation_enabled: Boolean,
  is_translator: Boolean,
  contributors_enabled: Boolean,
  lang: String,
  statuses_count: Number,
  verified: Boolean,
  geo_enabled: Boolean,
  time_zone: Schema.Types.Mixed,
  utc_offset: Schema.Types.Mixed,
  favourites_count: Number,
  listed_count: Number,
  friends_count: Number,
  followers_count: Number,
  'protected': Boolean,
  description: String,
  url: String,
  location: String,
  screen_name: String,
  name: String,
  id_str: String,
  id: Number,
 },{strict: false});

module.exports = mongoose.model('twitUserSchema', twitUserSchema);