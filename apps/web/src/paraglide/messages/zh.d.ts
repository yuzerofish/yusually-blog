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
export const admin: (inputs: AdminInputs) => LocalizedString;
export const admin_assets_description: (inputs: Admin_Assets_DescriptionInputs) => LocalizedString;
export const admin_assets_title: (inputs: Admin_Assets_TitleInputs) => LocalizedString;
export const admin_comments_approve: (inputs: Admin_Comments_ApproveInputs) => LocalizedString;
export const admin_comments_delete: (inputs: Admin_Comments_DeleteInputs) => LocalizedString;
export const admin_comments_description: (
  inputs: Admin_Comments_DescriptionInputs,
) => LocalizedString;
export const admin_comments_mark_spam: (inputs: Admin_Comments_Mark_SpamInputs) => LocalizedString;
export const admin_comments_title: (inputs: Admin_Comments_TitleInputs) => LocalizedString;
export const admin_latest_post: (inputs: Admin_Latest_PostInputs) => LocalizedString;
export const admin_manage_posts: (inputs: Admin_Manage_PostsInputs) => LocalizedString;
export const admin_metric_overview_description: (
  inputs: Admin_Metric_Overview_DescriptionInputs,
) => LocalizedString;
export const admin_moderation_queue: (inputs: Admin_Moderation_QueueInputs) => LocalizedString;
export const admin_moderation_queue_detail: (
  inputs: Admin_Moderation_Queue_DetailInputs,
) => LocalizedString;
export const admin_nav_assets: (inputs: Admin_Nav_AssetsInputs) => LocalizedString;
export const admin_nav_comments: (inputs: Admin_Nav_CommentsInputs) => LocalizedString;
export const admin_nav_overview: (inputs: Admin_Nav_OverviewInputs) => LocalizedString;
export const admin_nav_posts: (inputs: Admin_Nav_PostsInputs) => LocalizedString;
export const admin_nav_settings: (inputs: Admin_Nav_SettingsInputs) => LocalizedString;
export const admin_new_post: (inputs: Admin_New_PostInputs) => LocalizedString;
export const admin_overview_eyebrow: (inputs: Admin_Overview_EyebrowInputs) => LocalizedString;
export const admin_overview_title: (inputs: Admin_Overview_TitleInputs) => LocalizedString;
export const admin_posts_column_title: (inputs: Admin_Posts_Column_TitleInputs) => LocalizedString;
export const admin_posts_description: (inputs: Admin_Posts_DescriptionInputs) => LocalizedString;
export const admin_posts_public_url: (inputs: Admin_Posts_Public_UrlInputs) => LocalizedString;
export const admin_posts_source: (inputs: Admin_Posts_SourceInputs) => LocalizedString;
export const admin_posts_status: (inputs: Admin_Posts_StatusInputs) => LocalizedString;
export const admin_posts_title: (inputs: Admin_Posts_TitleInputs) => LocalizedString;
export const admin_posts_updated: (inputs: Admin_Posts_UpdatedInputs) => LocalizedString;
export const admin_posts_view: (inputs: Admin_Posts_ViewInputs) => LocalizedString;
export const admin_save_settings: (inputs: Admin_Save_SettingsInputs) => LocalizedString;
export const admin_settings_author_name: (
  inputs: Admin_Settings_Author_NameInputs,
) => LocalizedString;
export const admin_settings_default_og: (
  inputs: Admin_Settings_Default_OgInputs,
) => LocalizedString;
export const admin_settings_description: (
  inputs: Admin_Settings_DescriptionInputs,
) => LocalizedString;
export const admin_settings_help: (inputs: Admin_Settings_HelpInputs) => LocalizedString;
export const admin_settings_language: (inputs: Admin_Settings_LanguageInputs) => LocalizedString;
export const admin_settings_site_name: (inputs: Admin_Settings_Site_NameInputs) => LocalizedString;
export const admin_settings_site_url: (inputs: Admin_Settings_Site_UrlInputs) => LocalizedString;
export const admin_settings_title: (inputs: Admin_Settings_TitleInputs) => LocalizedString;
export const admin_storage_contract: (inputs: Admin_Storage_ContractInputs) => LocalizedString;
export const admin_storage_contract_detail: (
  inputs: Admin_Storage_Contract_DetailInputs,
) => LocalizedString;
export const account_management_note: (inputs: Account_Management_NoteInputs) => LocalizedString;
export const account_signed_in_as: (inputs: Account_Signed_In_AsInputs) => LocalizedString;
export const account_title: (inputs: Account_TitleInputs) => LocalizedString;
export const archive_title: (inputs: Archive_TitleInputs) => LocalizedString;
export const back_home: (inputs: Back_HomeInputs) => LocalizedString;
export const blog_description: (inputs: Blog_DescriptionInputs) => LocalizedString;
export const blog_eyebrow: (inputs: Blog_EyebrowInputs) => LocalizedString;
export const blog_title: (inputs: Blog_TitleInputs) => LocalizedString;
export const comments: (inputs: CommentsInputs) => LocalizedString;
export const comments_description: (inputs: Comments_DescriptionInputs) => LocalizedString;
export const contents: (inputs: ContentsInputs) => LocalizedString;
export const feature_api_title: (inputs: Feature_Api_TitleInputs) => LocalizedString;
export const feature_api_body: (inputs: Feature_Api_BodyInputs) => LocalizedString;
export const feature_d1_body: (inputs: Feature_D1_BodyInputs) => LocalizedString;
export const feature_moderation_title: (inputs: Feature_Moderation_TitleInputs) => LocalizedString;
export const feature_moderation_body: (inputs: Feature_Moderation_BodyInputs) => LocalizedString;
export const feature_r2_body: (inputs: Feature_R2_BodyInputs) => LocalizedString;
export const featured: (inputs: FeaturedInputs) => LocalizedString;
export const github_repository: (inputs: Github_RepositoryInputs) => LocalizedString;
export const home_bilingual_intro_en: (inputs: Home_Bilingual_Intro_EnInputs) => LocalizedString;
export const home_bilingual_intro_zh: (inputs: Home_Bilingual_Intro_ZhInputs) => LocalizedString;
export const home_eyebrow: (inputs: Home_EyebrowInputs) => LocalizedString;
export const home_featured_title: (inputs: Home_Featured_TitleInputs) => LocalizedString;
export const home_tags_description: (inputs: Home_Tags_DescriptionInputs) => LocalizedString;
export const language: (inputs: LanguageInputs) => LocalizedString;
export const language_english: (inputs: Language_EnglishInputs) => LocalizedString;
export const language_switch_to_en: (inputs: Language_Switch_To_EnInputs) => LocalizedString;
export const language_switch_to_zh: (inputs: Language_Switch_To_ZhInputs) => LocalizedString;
export const language_zh: (inputs: Language_ZhInputs) => LocalizedString;
export const latest_posts: (inputs: Latest_PostsInputs) => LocalizedString;
export const login: (inputs: LoginInputs) => LocalizedString;
export const login_alternative: (inputs: Login_AlternativeInputs) => LocalizedString;
export const login_email: (inputs: Login_EmailInputs) => LocalizedString;
export const login_error: (inputs: Login_ErrorInputs) => LocalizedString;
export const login_greeting: (inputs: Login_GreetingInputs) => LocalizedString;
export const login_no_account: (inputs: Login_No_AccountInputs) => LocalizedString;
export const login_password: (inputs: Login_PasswordInputs) => LocalizedString;
export const login_password_placeholder: (
  inputs: Login_Password_PlaceholderInputs,
) => LocalizedString;
export const login_pending: (inputs: Login_PendingInputs) => LocalizedString;
export const login_social_error: (inputs: Login_Social_ErrorInputs) => LocalizedString;
export const login_with_provider: (inputs: Login_With_ProviderInputs) => LocalizedString;
export const nav_about: (inputs: Nav_AboutInputs) => LocalizedString;
export const nav_archive: (inputs: Nav_ArchiveInputs) => LocalizedString;
export const nav_blog: (inputs: Nav_BlogInputs) => LocalizedString;
export const nav_projects: (inputs: Nav_ProjectsInputs) => LocalizedString;
export const nav_tags: (inputs: Nav_TagsInputs) => LocalizedString;
export const open_cms: (inputs: Open_CmsInputs) => LocalizedString;
export const pinned: (inputs: PinnedInputs) => LocalizedString;
export const posts_count: (inputs: Posts_CountInputs) => LocalizedString;
export const projects_eyebrow: (inputs: Projects_EyebrowInputs) => LocalizedString;
export const projects_title: (inputs: Projects_TitleInputs) => LocalizedString;
export const published_count: (inputs: Published_CountInputs) => LocalizedString;
export const read_latest_posts: (inputs: Read_Latest_PostsInputs) => LocalizedString;
export const related: (inputs: RelatedInputs) => LocalizedString;
export const rss_feed: (inputs: Rss_FeedInputs) => LocalizedString;
export const site_subtitle: (inputs: Site_SubtitleInputs) => LocalizedString;
export const signup: (inputs: SignupInputs) => LocalizedString;
export const signup_confirm_password: (inputs: Signup_Confirm_PasswordInputs) => LocalizedString;
export const signup_error: (inputs: Signup_ErrorInputs) => LocalizedString;
export const signup_greeting: (inputs: Signup_GreetingInputs) => LocalizedString;
export const signup_has_account: (inputs: Signup_Has_AccountInputs) => LocalizedString;
export const signup_name: (inputs: Signup_NameInputs) => LocalizedString;
export const signup_password_mismatch: (inputs: Signup_Password_MismatchInputs) => LocalizedString;
export const signup_pending: (inputs: Signup_PendingInputs) => LocalizedString;
export const sign_out: (inputs: Sign_OutInputs) => LocalizedString;
export const submit_comment: (inputs: Submit_CommentInputs) => LocalizedString;
export const tag_eyebrow: (inputs: Tag_EyebrowInputs) => LocalizedString;
export const tags_title: (inputs: Tags_TitleInputs) => LocalizedString;
export const theme_dark: (inputs: Theme_DarkInputs) => LocalizedString;
export const theme_light: (inputs: Theme_LightInputs) => LocalizedString;
export const theme_system: (inputs: Theme_SystemInputs) => LocalizedString;
export const theme_toggle: (inputs: Theme_ToggleInputs) => LocalizedString;
export const updated: (inputs: UpdatedInputs) => LocalizedString;
export const upload: (inputs: UploadInputs) => LocalizedString;
export const view_all_posts: (inputs: View_All_PostsInputs) => LocalizedString;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type AdminInputs = {};
export type Admin_Assets_DescriptionInputs = {};
export type Admin_Assets_TitleInputs = {};
export type Admin_Comments_ApproveInputs = {};
export type Admin_Comments_DeleteInputs = {};
export type Admin_Comments_DescriptionInputs = {};
export type Admin_Comments_Mark_SpamInputs = {};
export type Admin_Comments_TitleInputs = {};
export type Admin_Latest_PostInputs = {};
export type Admin_Manage_PostsInputs = {};
export type Admin_Metric_Overview_DescriptionInputs = {
  name: NonNullable<unknown>;
};
export type Admin_Moderation_QueueInputs = {};
export type Admin_Moderation_Queue_DetailInputs = {
  count: NonNullable<unknown>;
};
export type Admin_Nav_AssetsInputs = {};
export type Admin_Nav_CommentsInputs = {};
export type Admin_Nav_OverviewInputs = {};
export type Admin_Nav_PostsInputs = {};
export type Admin_Nav_SettingsInputs = {};
export type Admin_New_PostInputs = {};
export type Admin_Overview_EyebrowInputs = {};
export type Admin_Overview_TitleInputs = {};
export type Admin_Posts_Column_TitleInputs = {};
export type Admin_Posts_DescriptionInputs = {};
export type Admin_Posts_Public_UrlInputs = {};
export type Admin_Posts_SourceInputs = {};
export type Admin_Posts_StatusInputs = {};
export type Admin_Posts_TitleInputs = {};
export type Admin_Posts_UpdatedInputs = {};
export type Admin_Posts_ViewInputs = {};
export type Admin_Save_SettingsInputs = {};
export type Admin_Settings_Author_NameInputs = {};
export type Admin_Settings_Default_OgInputs = {};
export type Admin_Settings_DescriptionInputs = {};
export type Admin_Settings_HelpInputs = {};
export type Admin_Settings_LanguageInputs = {};
export type Admin_Settings_Site_NameInputs = {};
export type Admin_Settings_Site_UrlInputs = {};
export type Admin_Settings_TitleInputs = {};
export type Admin_Storage_ContractInputs = {};
export type Admin_Storage_Contract_DetailInputs = {};
export type Account_Management_NoteInputs = {};
export type Account_Signed_In_AsInputs = {};
export type Account_TitleInputs = {};
export type Archive_TitleInputs = {};
export type Back_HomeInputs = {};
export type Blog_DescriptionInputs = {};
export type Blog_EyebrowInputs = {};
export type Blog_TitleInputs = {};
export type CommentsInputs = {};
export type Comments_DescriptionInputs = {};
export type ContentsInputs = {};
export type Feature_Api_TitleInputs = {};
export type Feature_Api_BodyInputs = {};
export type Feature_D1_BodyInputs = {};
export type Feature_Moderation_TitleInputs = {};
export type Feature_Moderation_BodyInputs = {};
export type Feature_R2_BodyInputs = {};
export type FeaturedInputs = {};
export type Github_RepositoryInputs = {};
export type Home_Bilingual_Intro_EnInputs = {};
export type Home_Bilingual_Intro_ZhInputs = {};
export type Home_EyebrowInputs = {};
export type Home_Featured_TitleInputs = {};
export type Home_Tags_DescriptionInputs = {};
export type LanguageInputs = {};
export type Language_EnglishInputs = {};
export type Language_Switch_To_EnInputs = {};
export type Language_Switch_To_ZhInputs = {};
export type Language_ZhInputs = {};
export type Latest_PostsInputs = {};
export type LoginInputs = {};
export type Login_AlternativeInputs = {};
export type Login_EmailInputs = {};
export type Login_ErrorInputs = {};
export type Login_GreetingInputs = {
  name: NonNullable<unknown>;
};
export type Login_No_AccountInputs = {};
export type Login_PasswordInputs = {};
export type Login_Password_PlaceholderInputs = {};
export type Login_PendingInputs = {};
export type Login_Social_ErrorInputs = {
  provider: NonNullable<unknown>;
};
export type Login_With_ProviderInputs = {
  provider: NonNullable<unknown>;
};
export type Nav_AboutInputs = {};
export type Nav_ArchiveInputs = {};
export type Nav_BlogInputs = {};
export type Nav_ProjectsInputs = {};
export type Nav_TagsInputs = {};
export type Open_CmsInputs = {};
export type PinnedInputs = {};
export type Posts_CountInputs = {
  count: NonNullable<unknown>;
};
export type Projects_EyebrowInputs = {};
export type Projects_TitleInputs = {};
export type Published_CountInputs = {
  count: NonNullable<unknown>;
};
export type Read_Latest_PostsInputs = {};
export type RelatedInputs = {};
export type Rss_FeedInputs = {};
export type Site_SubtitleInputs = {};
export type SignupInputs = {};
export type Signup_Confirm_PasswordInputs = {};
export type Signup_ErrorInputs = {};
export type Signup_GreetingInputs = {
  name: NonNullable<unknown>;
};
export type Signup_Has_AccountInputs = {};
export type Signup_NameInputs = {};
export type Signup_Password_MismatchInputs = {};
export type Signup_PendingInputs = {};
export type Sign_OutInputs = {};
export type Submit_CommentInputs = {};
export type Tag_EyebrowInputs = {};
export type Tags_TitleInputs = {};
export type Theme_DarkInputs = {};
export type Theme_LightInputs = {};
export type Theme_SystemInputs = {};
export type Theme_ToggleInputs = {};
export type UpdatedInputs = {};
export type UploadInputs = {};
export type View_All_PostsInputs = {};
