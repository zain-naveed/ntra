const BaseUrl: string = "https://staging-ntra.kinsta.cloud//wp-json/";

const AuthUrl: string = "https://staging-ntra.kinsta.cloud/api/";

const CONSTANTS = {
  admobID: "ca-app-pub-1367360408572198~3977761816",
};

const EndPoint = {
  Page708: BaseUrl + "wp/v2/pages/708",
  Page23635: BaseUrl + "wp/v2/pages/23635",
  Post: AuthUrl + "get_category_posts/?slug=nhc-news",
  Post30406: BaseUrl + "wp/v2/posts/30406",
  Calender: BaseUrl + "mecexternal/v1/calendar/30900",
  Event: BaseUrl + "mecexternal/v1/event/",
  EventOne: BaseUrl + "mecexternal/v1/calendar/15878",
  NHC: BaseUrl + "wp/v2/pages/14083",
  Leader: BaseUrl + "custom-plugin/tourleaders",
  Login: AuthUrl + "auth/generate_auth_cookie/",
  Nonce: AuthUrl + "get_nonce/?controller=user&method=register",
  Register: AuthUrl + "user/register/",
  profile_Detail: AuthUrl + "user/get_userinfo/",
  update_Profile: AuthUrl + "user/update_user_meta_vars/",
  resetPassword: AuthUrl + "user/retrieve_password/",
  PostDetail: AuthUrl + "get_post/",
  AllLeaders: BaseUrl + "custom-plugin/users/",
  LoginSession: AuthUrl + "auth/get_currentuserinfo",
};
export { EndPoint, CONSTANTS };
