const backEndDomin = "http://localhost:3000";

export const summaryApi = {
  signUp: {
    url: `${backEndDomin}/api/auth/add`,
    method: "post",
  },
  login: {
    url: `${backEndDomin}/api/auth/login`,
    method: "post",
  },
  forgetpass: {
    url: `${backEndDomin}/api/auth/forgetpass`,
    method: "post",
  },
  changePass: {
    url: `${backEndDomin}/api/auth/updatepasss`,
    method: "post",
  },
  resendOtp: {
    url: `${backEndDomin}/api/auth/resendOtp`,
    method: "get",
  },
  verify: {
    url: `${backEndDomin}/api/auth/verify`,
    method: "get",
  },
  verifyotp: {
    url: `${backEndDomin}/api/auth/verifyotp`,
    method: "get",
  },
  checkuser: {
    url: `${backEndDomin}/api/auth/userinfo`,
    method: "get",
  },
  logout: {
    url: `${backEndDomin}/api/auth/logout`,
    method: "get",
  },
  createPost: {
    url: `${backEndDomin}/api/post/add/`,
    method: "post",
  },
  getAllPost: {
    url: `${backEndDomin}/api/post/allpost/`,
    method: "post",
  },
  likeUnlike: {
    url: `${backEndDomin}/api/post/likeunlike/`,
    method: "post",
  },
  commentPost: {
    url: `${backEndDomin}/api/post/addcomment/`,
    method: "post",
  },
  replyComment: {
    url: `${backEndDomin}/api/post/addreply/`,
    method: "post",
  },
  addlikecommnet: {
    url: `${backEndDomin}/api/post/addlikecommnet/`,
    method: "post",
  },
  getSuggestFriend: {
    url: `${backEndDomin}/api/user/suggestUser/`,
    method: "get",
  },
  sendFriendreq: {
    url: `${backEndDomin}/api/user/sendFriendreq/`,
    method: "get",
  },
  getpendingfriend: {
    url: `${backEndDomin}/api/user/getpendingfriend/`,
    method: "get",
  },
  cencelreq: {
    url: `${backEndDomin}/api/user/cencelreq/`,
    method: "get",
  },
  acceptreq: {
    url: `${backEndDomin}/api/user/acceptreq/`,
    method: "get",
  },
  addStory: {
    url: `${backEndDomin}/api/user/addStory/`,
    method: "post",
  },
  getStory: {
    url: `${backEndDomin}/api/user/getstory/`,
    method: "post",
  },
};
