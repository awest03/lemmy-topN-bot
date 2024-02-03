import { LemmyHttp } from 'lemmy-js-client';
import fs from 'fs';

/* ======================== Login Details ============================= */
const settings = JSON.parse(fs.readFileSync("settings.json", "utf-8"));

let lemmyClient = new LemmyHttp(settings.instance);

const login = async () => {
  console.log("Logging in");
  let loginRes = await lemmyClient.login({
    username_or_email: settings.username,
    password: settings.password
  });

  lemmyClient.setHeaders({
    Authorization: `Bearer ${loginRes.jwt!}`
  });

  return loginRes.jwt;
};

// Creates the section for each community in the list
var createCommunitySummary = async (community_name : string) => {
  var postStr: string = "";
  let listPostRes = await lemmyClient.getPosts({
    community_name: community_name,
    sort: settings.sort,
    limit: settings.count
  });
  var c = await lemmyClient.getCommunity({ name: community_name });
  var title = c.community_view.community.title;
  postStr += "From [" + title + "](" + settings.instance +  "/c/" + community_name + "):\n";
  for (var post of listPostRes.posts) {
    postStr += "- [" + post.post.name + "](" + settings.instance + "/post/" + post.post.id + ")\n";
  }
  postStr += "\n";
  return postStr;
}

// Creates the post
const createPost = async () => {
  console.log("Creating Post String");
  var postString: string = settings.body + "\n\n";
  for (var community of settings.communities) {
    postString += await createCommunitySummary(community);
  }
  console.log("Creating Post");
  var commId = (await lemmyClient.getCommunity({name: settings.community})).community_view.community.id;
  var post = await lemmyClient.createPost({
    community_id: commId,
    name: settings.title + " — " + (new Date()).toDateString(),
    body: postString
  });
  console.log("Post created: " + settings.instance + "/post/" + post.post_view.post.id);
}

login();
createPost();