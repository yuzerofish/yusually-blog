/* eslint-disable */
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} AdminInputs */
/** @typedef {{}} Admin_Assets_DescriptionInputs */
/** @typedef {{}} Admin_Assets_TitleInputs */
/** @typedef {{}} Admin_Comments_ApproveInputs */
/** @typedef {{}} Admin_Comments_DeleteInputs */
/** @typedef {{}} Admin_Comments_DescriptionInputs */
/** @typedef {{}} Admin_Comments_Mark_SpamInputs */
/** @typedef {{}} Admin_Comments_TitleInputs */
/** @typedef {{}} Admin_Latest_PostInputs */
/** @typedef {{}} Admin_Manage_PostsInputs */
/** @typedef {{ name: NonNullable<unknown> }} Admin_Metric_Overview_DescriptionInputs */
/** @typedef {{}} Admin_Moderation_QueueInputs */
/** @typedef {{ count: NonNullable<unknown> }} Admin_Moderation_Queue_DetailInputs */
/** @typedef {{}} Admin_Nav_AssetsInputs */
/** @typedef {{}} Admin_Nav_CommentsInputs */
/** @typedef {{}} Admin_Nav_OverviewInputs */
/** @typedef {{}} Admin_Nav_PostsInputs */
/** @typedef {{}} Admin_Nav_SettingsInputs */
/** @typedef {{}} Admin_New_PostInputs */
/** @typedef {{}} Admin_Overview_EyebrowInputs */
/** @typedef {{}} Admin_Overview_TitleInputs */
/** @typedef {{}} Admin_Posts_Column_TitleInputs */
/** @typedef {{}} Admin_Posts_DescriptionInputs */
/** @typedef {{}} Admin_Posts_Public_UrlInputs */
/** @typedef {{}} Admin_Posts_SourceInputs */
/** @typedef {{}} Admin_Posts_StatusInputs */
/** @typedef {{}} Admin_Posts_TitleInputs */
/** @typedef {{}} Admin_Posts_UpdatedInputs */
/** @typedef {{}} Admin_Posts_ViewInputs */
/** @typedef {{}} Admin_Save_SettingsInputs */
/** @typedef {{}} Admin_Settings_Author_NameInputs */
/** @typedef {{}} Admin_Settings_Default_OgInputs */
/** @typedef {{}} Admin_Settings_DescriptionInputs */
/** @typedef {{}} Admin_Settings_HelpInputs */
/** @typedef {{}} Admin_Settings_LanguageInputs */
/** @typedef {{}} Admin_Settings_Site_NameInputs */
/** @typedef {{}} Admin_Settings_Site_UrlInputs */
/** @typedef {{}} Admin_Settings_TitleInputs */
/** @typedef {{}} Admin_Storage_ContractInputs */
/** @typedef {{}} Admin_Storage_Contract_DetailInputs */
/** @typedef {{}} Account_Management_NoteInputs */
/** @typedef {{}} Account_Signed_In_AsInputs */
/** @typedef {{}} Account_TitleInputs */
/** @typedef {{}} Archive_TitleInputs */
/** @typedef {{}} Back_HomeInputs */
/** @typedef {{}} Blog_DescriptionInputs */
/** @typedef {{}} Blog_EyebrowInputs */
/** @typedef {{}} Blog_TitleInputs */
/** @typedef {{}} CommentsInputs */
/** @typedef {{}} Comments_DescriptionInputs */
/** @typedef {{}} ContentsInputs */
/** @typedef {{}} Feature_Api_TitleInputs */
/** @typedef {{}} Feature_Api_BodyInputs */
/** @typedef {{}} Feature_D1_BodyInputs */
/** @typedef {{}} Feature_Moderation_TitleInputs */
/** @typedef {{}} Feature_Moderation_BodyInputs */
/** @typedef {{}} Feature_R2_BodyInputs */
/** @typedef {{}} FeaturedInputs */
/** @typedef {{}} Github_RepositoryInputs */
/** @typedef {{}} Home_Bilingual_Intro_EnInputs */
/** @typedef {{}} Home_Bilingual_Intro_ZhInputs */
/** @typedef {{}} Home_EyebrowInputs */
/** @typedef {{}} Home_Featured_TitleInputs */
/** @typedef {{}} Home_Tags_DescriptionInputs */
/** @typedef {{}} LanguageInputs */
/** @typedef {{}} Language_EnglishInputs */
/** @typedef {{}} Language_Switch_To_EnInputs */
/** @typedef {{}} Language_Switch_To_ZhInputs */
/** @typedef {{}} Language_ZhInputs */
/** @typedef {{}} Latest_PostsInputs */
/** @typedef {{}} LoginInputs */
/** @typedef {{}} Login_AlternativeInputs */
/** @typedef {{}} Login_EmailInputs */
/** @typedef {{}} Login_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Login_GreetingInputs */
/** @typedef {{}} Login_No_AccountInputs */
/** @typedef {{}} Login_PasswordInputs */
/** @typedef {{}} Login_Password_PlaceholderInputs */
/** @typedef {{}} Login_PendingInputs */
/** @typedef {{ provider: NonNullable<unknown> }} Login_Social_ErrorInputs */
/** @typedef {{ provider: NonNullable<unknown> }} Login_With_ProviderInputs */
/** @typedef {{}} Nav_AboutInputs */
/** @typedef {{}} Nav_ArchiveInputs */
/** @typedef {{}} Nav_BlogInputs */
/** @typedef {{}} Nav_ProjectsInputs */
/** @typedef {{}} Nav_TagsInputs */
/** @typedef {{}} Open_CmsInputs */
/** @typedef {{}} PinnedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Posts_CountInputs */
/** @typedef {{}} Projects_EyebrowInputs */
/** @typedef {{}} Projects_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Published_CountInputs */
/** @typedef {{}} Read_Latest_PostsInputs */
/** @typedef {{}} RelatedInputs */
/** @typedef {{}} Rss_FeedInputs */
/** @typedef {{}} Site_SubtitleInputs */
/** @typedef {{}} SignupInputs */
/** @typedef {{}} Signup_Confirm_PasswordInputs */
/** @typedef {{}} Signup_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Signup_GreetingInputs */
/** @typedef {{}} Signup_Has_AccountInputs */
/** @typedef {{}} Signup_NameInputs */
/** @typedef {{}} Signup_Password_MismatchInputs */
/** @typedef {{}} Signup_PendingInputs */
/** @typedef {{}} Sign_OutInputs */
/** @typedef {{}} Submit_CommentInputs */
/** @typedef {{}} Tag_EyebrowInputs */
/** @typedef {{}} Tags_TitleInputs */
/** @typedef {{}} Theme_DarkInputs */
/** @typedef {{}} Theme_LightInputs */
/** @typedef {{}} Theme_SystemInputs */
/** @typedef {{}} Theme_ToggleInputs */
/** @typedef {{}} UpdatedInputs */
/** @typedef {{}} UploadInputs */
/** @typedef {{}} View_All_PostsInputs */

export const admin = /** @type {(inputs: AdminInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Admin`;
};

export const admin_assets_description =
  /** @type {(inputs: Admin_Assets_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `R2-backed images and attachments.`;
  };

export const admin_assets_title =
  /** @type {(inputs: Admin_Assets_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Assets`;
  };

export const admin_comments_approve =
  /** @type {(inputs: Admin_Comments_ApproveInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Approve`;
  };

export const admin_comments_delete =
  /** @type {(inputs: Admin_Comments_DeleteInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Delete`;
  };

export const admin_comments_description =
  /** @type {(inputs: Admin_Comments_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Review pending comments before they appear publicly.`;
  };

export const admin_comments_mark_spam =
  /** @type {(inputs: Admin_Comments_Mark_SpamInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Mark spam`;
  };

export const admin_comments_title =
  /** @type {(inputs: Admin_Comments_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Comments`;
  };

export const admin_latest_post =
  /** @type {(inputs: Admin_Latest_PostInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Latest post`;
  };

export const admin_manage_posts =
  /** @type {(inputs: Admin_Manage_PostsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Manage posts`;
  };

export const admin_metric_overview_description =
  /** @type {(inputs: Admin_Metric_Overview_DescriptionInputs) => LocalizedString} */ (i) => {
    return /** @type {LocalizedString} */ `Manage posts, assets, comments, API tokens, and site settings for ${i?.name}.`;
  };

export const admin_moderation_queue =
  /** @type {(inputs: Admin_Moderation_QueueInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Moderation queue`;
  };

export const admin_moderation_queue_detail =
  /** @type {(inputs: Admin_Moderation_Queue_DetailInputs) => LocalizedString} */ (i) => {
    return /** @type {LocalizedString} */ `${i?.count} comment is waiting for review. New public comments default to pending.`;
  };

export const admin_nav_assets =
  /** @type {(inputs: Admin_Nav_AssetsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Assets`;
  };

export const admin_nav_comments =
  /** @type {(inputs: Admin_Nav_CommentsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Comments`;
  };

export const admin_nav_overview =
  /** @type {(inputs: Admin_Nav_OverviewInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Overview`;
  };

export const admin_nav_posts =
  /** @type {(inputs: Admin_Nav_PostsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Posts`;
  };

export const admin_nav_settings =
  /** @type {(inputs: Admin_Nav_SettingsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Settings`;
  };

export const admin_new_post =
  /** @type {(inputs: Admin_New_PostInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `New post`;
  };

export const admin_overview_eyebrow =
  /** @type {(inputs: Admin_Overview_EyebrowInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Admin`;
  };

export const admin_overview_title =
  /** @type {(inputs: Admin_Overview_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `CMS overview`;
  };

export const admin_posts_column_title =
  /** @type {(inputs: Admin_Posts_Column_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Title`;
  };

export const admin_posts_description =
  /** @type {(inputs: Admin_Posts_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Create bilingual drafts, publish Markdown, and manage status.`;
  };

export const admin_posts_public_url =
  /** @type {(inputs: Admin_Posts_Public_UrlInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Public URL`;
  };

export const admin_posts_source =
  /** @type {(inputs: Admin_Posts_SourceInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Source`;
  };

export const admin_posts_status =
  /** @type {(inputs: Admin_Posts_StatusInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Status`;
  };

export const admin_posts_title =
  /** @type {(inputs: Admin_Posts_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Posts`;
  };

export const admin_posts_updated =
  /** @type {(inputs: Admin_Posts_UpdatedInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Updated`;
  };

export const admin_posts_view =
  /** @type {(inputs: Admin_Posts_ViewInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `View`;
  };

export const admin_save_settings =
  /** @type {(inputs: Admin_Save_SettingsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Save settings`;
  };

export const admin_settings_author_name =
  /** @type {(inputs: Admin_Settings_Author_NameInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Author name`;
  };

export const admin_settings_default_og =
  /** @type {(inputs: Admin_Settings_Default_OgInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Default OG image`;
  };

export const admin_settings_description =
  /** @type {(inputs: Admin_Settings_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Description`;
  };

export const admin_settings_help =
  /** @type {(inputs: Admin_Settings_HelpInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Basic identity, SEO, RSS, comments, and primary language configuration.`;
  };

export const admin_settings_language =
  /** @type {(inputs: Admin_Settings_LanguageInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Primary language`;
  };

export const admin_settings_site_name =
  /** @type {(inputs: Admin_Settings_Site_NameInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Site name`;
  };

export const admin_settings_site_url =
  /** @type {(inputs: Admin_Settings_Site_UrlInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Site URL`;
  };

export const admin_settings_title =
  /** @type {(inputs: Admin_Settings_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Site settings`;
  };

export const admin_storage_contract =
  /** @type {(inputs: Admin_Storage_ContractInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Storage contract`;
  };

export const admin_storage_contract_detail =
  /** @type {(inputs: Admin_Storage_Contract_DetailInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `D1 owns structured records. R2 owns images, imports, exports, and backups.`;
  };

export const account_management_note =
  /** @type {(inputs: Account_Management_NoteInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Use the CMS admin area to manage publishing, settings, and exports.`;
  };

export const account_signed_in_as =
  /** @type {(inputs: Account_Signed_In_AsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Signed in as`;
  };

export const account_title = /** @type {(inputs: Account_TitleInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Account`;
};

export const archive_title = /** @type {(inputs: Archive_TitleInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Archive`;
};

export const back_home = /** @type {(inputs: Back_HomeInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Back to home`;
};

export const blog_description =
  /** @type {(inputs: Blog_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Articles about the Cloud Blog CMS template, Cloudflare-native storage, Markdown publishing, and automation workflows.`;
  };

export const blog_eyebrow = /** @type {(inputs: Blog_EyebrowInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Blog`;
};

export const blog_title = /** @type {(inputs: Blog_TitleInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Durable publishing notes`;
};

export const comments = /** @type {(inputs: CommentsInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Comments`;
};

export const comments_description =
  /** @type {(inputs: Comments_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `New comments are held for review before publication.`;
  };

export const contents = /** @type {(inputs: ContentsInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Contents`;
};

export const feature_api_title =
  /** @type {(inputs: Feature_Api_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `CLI + API`;
  };

export const feature_api_body =
  /** @type {(inputs: Feature_Api_BodyInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Automation surfaces for developers and AI agents.`;
  };

export const feature_d1_body =
  /** @type {(inputs: Feature_D1_BodyInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Posts, comments, settings, users, and API tokens.`;
  };

export const feature_moderation_title =
  /** @type {(inputs: Feature_Moderation_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Moderation`;
  };

export const feature_moderation_body =
  /** @type {(inputs: Feature_Moderation_BodyInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Pending comments, Turnstile, rate limits, and spam review.`;
  };

export const feature_r2_body =
  /** @type {(inputs: Feature_R2_BodyInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Images, imports, exports, attachments, and backups.`;
  };

export const featured = /** @type {(inputs: FeaturedInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Featured`;
};

export const github_repository =
  /** @type {(inputs: Github_RepositoryInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `GitHub repository`;
  };

export const home_bilingual_intro_en =
  /** @type {(inputs: Home_Bilingual_Intro_EnInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `EN: Cloud Blog CMS is a Cloudflare-native personal publishing system with visual writing, Markdown import, bilingual content, and AI-ready automation.`;
  };

export const home_bilingual_intro_zh =
  /** @type {(inputs: Home_Bilingual_Intro_ZhInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `中文：Cloud Blog CMS 是面向个人创作者的 Cloudflare 原生发布系统，支持可视化写作、Markdown 导入、中英文内容和 AI 自动化。`;
  };

export const home_eyebrow = /** @type {(inputs: Home_EyebrowInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Cloudflare-native Personal Blog CMS`;
};

export const home_featured_title =
  /** @type {(inputs: Home_Featured_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Publishing stack notes`;
  };

export const home_tags_description =
  /** @type {(inputs: Home_Tags_DescriptionInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Browse by publishing workflow, Cloudflare infrastructure, and AI automation.`;
  };

export const language = /** @type {(inputs: LanguageInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Language`;
};

export const language_english =
  /** @type {(inputs: Language_EnglishInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `English`;
  };

export const language_switch_to_en =
  /** @type {(inputs: Language_Switch_To_EnInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Switch to English`;
  };

export const language_switch_to_zh =
  /** @type {(inputs: Language_Switch_To_ZhInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `切换到中文`;
  };

export const language_zh = /** @type {(inputs: Language_ZhInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `中文`;
};

export const latest_posts = /** @type {(inputs: Latest_PostsInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Latest posts`;
};

export const login = /** @type {(inputs: LoginInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Login`;
};

export const login_alternative =
  /** @type {(inputs: Login_AlternativeInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Or`;
  };

export const login_email = /** @type {(inputs: Login_EmailInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Email`;
};

export const login_error = /** @type {(inputs: Login_ErrorInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `An error occurred while signing in.`;
};

export const login_greeting = /** @type {(inputs: Login_GreetingInputs) => LocalizedString} */ (
  i,
) => {
  return /** @type {LocalizedString} */ `Welcome back to ${i?.name}`;
};

export const login_no_account =
  /** @type {(inputs: Login_No_AccountInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Don't have an account?`;
  };

export const login_password =
  /** @type {(inputs: Login_PasswordInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Password`;
  };

export const login_password_placeholder =
  /** @type {(inputs: Login_Password_PlaceholderInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Enter password here`;
  };

export const login_pending = /** @type {(inputs: Login_PendingInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Logging in...`;
};

export const login_social_error =
  /** @type {(inputs: Login_Social_ErrorInputs) => LocalizedString} */ (i) => {
    return /** @type {LocalizedString} */ `An error occurred during ${i?.provider} sign-in.`;
  };

export const login_with_provider =
  /** @type {(inputs: Login_With_ProviderInputs) => LocalizedString} */ (i) => {
    return /** @type {LocalizedString} */ `Login with ${i?.provider}`;
  };

export const nav_about = /** @type {(inputs: Nav_AboutInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `About`;
};

export const nav_archive = /** @type {(inputs: Nav_ArchiveInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Archive`;
};

export const nav_blog = /** @type {(inputs: Nav_BlogInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Blog`;
};

export const nav_projects = /** @type {(inputs: Nav_ProjectsInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Projects`;
};

export const nav_tags = /** @type {(inputs: Nav_TagsInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Tags`;
};

export const open_cms = /** @type {(inputs: Open_CmsInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Open CMS`;
};

export const pinned = /** @type {(inputs: PinnedInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Pinned`;
};

export const posts_count = /** @type {(inputs: Posts_CountInputs) => LocalizedString} */ (i) => {
  return /** @type {LocalizedString} */ `${i?.count} posts`;
};

export const projects_eyebrow =
  /** @type {(inputs: Projects_EyebrowInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Projects`;
  };

export const projects_title =
  /** @type {(inputs: Projects_TitleInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Template and Skill deliverables`;
  };

export const published_count = /** @type {(inputs: Published_CountInputs) => LocalizedString} */ (
  i,
) => {
  return /** @type {LocalizedString} */ `${i?.count} published`;
};

export const read_latest_posts =
  /** @type {(inputs: Read_Latest_PostsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Read latest posts`;
  };

export const related = /** @type {(inputs: RelatedInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Related`;
};

export const rss_feed = /** @type {(inputs: Rss_FeedInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `RSS feed`;
};

export const site_subtitle = /** @type {(inputs: Site_SubtitleInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Cloudflare-native publishing`;
};

export const signup = /** @type {(inputs: SignupInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Sign up`;
};

export const signup_confirm_password =
  /** @type {(inputs: Signup_Confirm_PasswordInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Confirm Password`;
  };

export const signup_error = /** @type {(inputs: Signup_ErrorInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `An error occurred while signing up.`;
};

export const signup_greeting = /** @type {(inputs: Signup_GreetingInputs) => LocalizedString} */ (
  i,
) => {
  return /** @type {LocalizedString} */ `Create your ${i?.name} admin account`;
};

export const signup_has_account =
  /** @type {(inputs: Signup_Has_AccountInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Already have an account?`;
  };

export const signup_name = /** @type {(inputs: Signup_NameInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Name`;
};

export const signup_password_mismatch =
  /** @type {(inputs: Signup_Password_MismatchInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Passwords do not match.`;
  };

export const signup_pending =
  /** @type {(inputs: Signup_PendingInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Signing up...`;
  };

export const sign_out = /** @type {(inputs: Sign_OutInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Sign out`;
};

export const submit_comment =
  /** @type {(inputs: Submit_CommentInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `Submit comment`;
  };

export const tag_eyebrow = /** @type {(inputs: Tag_EyebrowInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Tag`;
};

export const tags_title = /** @type {(inputs: Tags_TitleInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Tags`;
};

export const theme_dark = /** @type {(inputs: Theme_DarkInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Dark`;
};

export const theme_light = /** @type {(inputs: Theme_LightInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Light`;
};

export const theme_system = /** @type {(inputs: Theme_SystemInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `System`;
};

export const theme_toggle = /** @type {(inputs: Theme_ToggleInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Toggle theme`;
};

export const updated = /** @type {(inputs: UpdatedInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Updated`;
};

export const upload = /** @type {(inputs: UploadInputs) => LocalizedString} */ () => {
  return /** @type {LocalizedString} */ `Upload`;
};

export const view_all_posts =
  /** @type {(inputs: View_All_PostsInputs) => LocalizedString} */ () => {
    return /** @type {LocalizedString} */ `View all posts`;
  };
