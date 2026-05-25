/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js";
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} AdminInputs */
/** @typedef {{}} Admin_Assets_DescriptionInputs */
/** @typedef {{}} Admin_Assets_ErrorInputs */
/** @typedef {{}} Admin_Assets_FilenameInputs */
/** @typedef {{}} Admin_Assets_TitleInputs */
/** @typedef {{}} Admin_Assets_UploadedInputs */
/** @typedef {{}} Admin_Assets_UploadingInputs */
/** @typedef {{}} Admin_Assets_UrlInputs */
/** @typedef {{}} Admin_Comments_ApproveInputs */
/** @typedef {{}} Admin_Comments_DeleteInputs */
/** @typedef {{}} Admin_Comments_DescriptionInputs */
/** @typedef {{}} Admin_Comments_Mark_SpamInputs */
/** @typedef {{}} Admin_Comments_TitleInputs */
/** @typedef {{}} Admin_Editor_Default_ExcerptInputs */
/** @typedef {{}} Admin_Editor_Default_TitleInputs */
/** @typedef {{}} Admin_Editor_DescriptionInputs */
/** @typedef {{}} Admin_Editor_ErrorInputs */
/** @typedef {{}} Admin_Editor_ExcerptInputs */
/** @typedef {{}} Admin_Editor_Preview_ModeInputs */
/** @typedef {{}} Admin_Editor_Rich_ModeInputs */
/** @typedef {{}} Admin_Editor_SavedInputs */
/** @typedef {{}} Admin_Editor_Source_ModeInputs */
/** @typedef {{}} Admin_Editor_TitleInputs */
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
/** @typedef {{}} Admin_Posts_SearchInputs */
/** @typedef {{}} Admin_Posts_SourceInputs */
/** @typedef {{}} Admin_Posts_StatusInputs */
/** @typedef {{}} Admin_Posts_TitleInputs */
/** @typedef {{}} Admin_Posts_UpdatedInputs */
/** @typedef {{}} Admin_Posts_ViewInputs */
/** @typedef {{}} Admin_Publish_PostInputs */
/** @typedef {{}} Admin_Save_DraftInputs */
/** @typedef {{}} Admin_Save_SettingsInputs */
/** @typedef {{}} Admin_Settings_Author_BioInputs */
/** @typedef {{}} Admin_Settings_Author_NameInputs */
/** @typedef {{}} Admin_Settings_Default_OgInputs */
/** @typedef {{}} Admin_Settings_DescriptionInputs */
/** @typedef {{}} Admin_Settings_ErrorInputs */
/** @typedef {{}} Admin_Settings_HelpInputs */
/** @typedef {{}} Admin_Settings_IndexingInputs */
/** @typedef {{}} Admin_Settings_LanguageInputs */
/** @typedef {{}} Admin_Settings_SavedInputs */
/** @typedef {{}} Admin_Settings_Site_NameInputs */
/** @typedef {{}} Admin_Settings_Site_UrlInputs */
/** @typedef {{}} Admin_Settings_TitleInputs */
/** @typedef {{}} Admin_Storage_ContractInputs */
/** @typedef {{}} Admin_Storage_Contract_DetailInputs */
/** @typedef {{}} Admin_Create_TokenInputs */
/** @typedef {{}} Admin_Revoke_TokenInputs */
/** @typedef {{}} Admin_Token_NameInputs */
/** @typedef {{}} Admin_Token_RevokedInputs */
/** @typedef {{}} Admin_Token_ScopesInputs */
/** @typedef {{}} Admin_Token_Secret_OnceInputs */
/** @typedef {{}} Admin_Tokens_DescriptionInputs */
/** @typedef {{}} Admin_Tokens_TitleInputs */
/** @typedef {{}} Account_Management_NoteInputs */
/** @typedef {{}} Account_Signed_In_AsInputs */
/** @typedef {{}} Account_TitleInputs */
/** @typedef {{}} Archive_TitleInputs */
/** @typedef {{}} Api_DescriptionInputs */
/** @typedef {{}} Api_EyebrowInputs */
/** @typedef {{}} Api_Manage_SettingsInputs */
/** @typedef {{}} Api_MethodInputs */
/** @typedef {{}} Api_Open_OpenapiInputs */
/** @typedef {{}} Api_PathInputs */
/** @typedef {{}} Api_ScopeInputs */
/** @typedef {{}} Api_TitleInputs */
/** @typedef {{}} Api_Token_ScopesInputs */
/** @typedef {{}} Back_HomeInputs */
/** @typedef {{}} Blog_DescriptionInputs */
/** @typedef {{}} Blog_EyebrowInputs */
/** @typedef {{}} Blog_Filter_AllInputs */
/** @typedef {{}} Blog_Filter_LabelInputs */
/** @typedef {{}} Blog_No_ResultsInputs */
/** @typedef {{}} Blog_Search_PlaceholderInputs */
/** @typedef {{}} Blog_Search_SubmitInputs */
/** @typedef {{}} Blog_TitleInputs */
/** @typedef {{}} Comment_BodyInputs */
/** @typedef {{}} Comment_CompanyInputs */
/** @typedef {{}} Comment_EmailInputs */
/** @typedef {{}} Comment_ErrorInputs */
/** @typedef {{}} Comment_NameInputs */
/** @typedef {{}} Comment_SubmittingInputs */
/** @typedef {{}} Comment_SuccessInputs */
/** @typedef {{}} Comment_WebsiteInputs */
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
/** @typedef {{}} Pagination_NextInputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Pagination_PageInputs */
/** @typedef {{}} Pagination_PreviousInputs */
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
import * as __en from "./en.js";
import * as __zh from "./zh.js";
/**
 * | output |
 * | --- |
 * | "Admin" |
 *
 * @param {AdminInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin =
  /** @type {((inputs?: AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<AdminInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin(inputs);
      return __zh.admin(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "R2-backed images and attachments." |
 *
 * @param {Admin_Assets_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_description =
  /** @type {((inputs?: Admin_Assets_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_description(inputs);
      return __zh.admin_assets_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Asset could not be uploaded." |
 *
 * @param {Admin_Assets_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_error =
  /** @type {((inputs?: Admin_Assets_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_error(inputs);
      return __zh.admin_assets_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Filename" |
 *
 * @param {Admin_Assets_FilenameInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_filename =
  /** @type {((inputs?: Admin_Assets_FilenameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_FilenameInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_filename(inputs);
      return __zh.admin_assets_filename(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Assets" |
 *
 * @param {Admin_Assets_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_title =
  /** @type {((inputs?: Admin_Assets_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_title(inputs);
      return __zh.admin_assets_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Asset upload accepted." |
 *
 * @param {Admin_Assets_UploadedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_uploaded =
  /** @type {((inputs?: Admin_Assets_UploadedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_UploadedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_uploaded(inputs);
      return __zh.admin_assets_uploaded(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Uploading..." |
 *
 * @param {Admin_Assets_UploadingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_uploading =
  /** @type {((inputs?: Admin_Assets_UploadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_UploadingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_uploading(inputs);
      return __zh.admin_assets_uploading(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Asset URL" |
 *
 * @param {Admin_Assets_UrlInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_assets_url =
  /** @type {((inputs?: Admin_Assets_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_UrlInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_assets_url(inputs);
      return __zh.admin_assets_url(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Approve" |
 *
 * @param {Admin_Comments_ApproveInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_comments_approve =
  /** @type {((inputs?: Admin_Comments_ApproveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_ApproveInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_comments_approve(inputs);
      return __zh.admin_comments_approve(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Delete" |
 *
 * @param {Admin_Comments_DeleteInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_comments_delete =
  /** @type {((inputs?: Admin_Comments_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_comments_delete(inputs);
      return __zh.admin_comments_delete(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Review pending comments before they appear publicly." |
 *
 * @param {Admin_Comments_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_comments_description =
  /** @type {((inputs?: Admin_Comments_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_comments_description(inputs);
      return __zh.admin_comments_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Mark spam" |
 *
 * @param {Admin_Comments_Mark_SpamInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_comments_mark_spam =
  /** @type {((inputs?: Admin_Comments_Mark_SpamInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Mark_SpamInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_comments_mark_spam(inputs);
      return __zh.admin_comments_mark_spam(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Comments" |
 *
 * @param {Admin_Comments_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_comments_title =
  /** @type {((inputs?: Admin_Comments_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_comments_title(inputs);
      return __zh.admin_comments_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "A short summary for the new post." |
 *
 * @param {Admin_Editor_Default_ExcerptInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_default_excerpt =
  /** @type {((inputs?: Admin_Editor_Default_ExcerptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Default_ExcerptInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_default_excerpt(inputs);
      return __zh.admin_editor_default_excerpt(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "New bilingual post" |
 *
 * @param {Admin_Editor_Default_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_default_title =
  /** @type {((inputs?: Admin_Editor_Default_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Default_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_default_title(inputs);
      return __zh.admin_editor_default_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Write Markdown, preview the rendered shape, then save as draft or publish through the API." |
 *
 * @param {Admin_Editor_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_description =
  /** @type {((inputs?: Admin_Editor_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_description(inputs);
      return __zh.admin_editor_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Post could not be saved." |
 *
 * @param {Admin_Editor_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_error =
  /** @type {((inputs?: Admin_Editor_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_error(inputs);
      return __zh.admin_editor_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Excerpt" |
 *
 * @param {Admin_Editor_ExcerptInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_excerpt =
  /** @type {((inputs?: Admin_Editor_ExcerptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_ExcerptInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_excerpt(inputs);
      return __zh.admin_editor_excerpt(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Preview" |
 *
 * @param {Admin_Editor_Preview_ModeInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_preview_mode =
  /** @type {((inputs?: Admin_Editor_Preview_ModeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Preview_ModeInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_preview_mode(inputs);
      return __zh.admin_editor_preview_mode(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Editor" |
 *
 * @param {Admin_Editor_Rich_ModeInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_rich_mode =
  /** @type {((inputs?: Admin_Editor_Rich_ModeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Rich_ModeInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_rich_mode(inputs);
      return __zh.admin_editor_rich_mode(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Post saved through the API." |
 *
 * @param {Admin_Editor_SavedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_saved =
  /** @type {((inputs?: Admin_Editor_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_SavedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_saved(inputs);
      return __zh.admin_editor_saved(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Source" |
 *
 * @param {Admin_Editor_Source_ModeInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_source_mode =
  /** @type {((inputs?: Admin_Editor_Source_ModeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Source_ModeInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_source_mode(inputs);
      return __zh.admin_editor_source_mode(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Markdown editor" |
 *
 * @param {Admin_Editor_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_editor_title =
  /** @type {((inputs?: Admin_Editor_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_editor_title(inputs);
      return __zh.admin_editor_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Latest post" |
 *
 * @param {Admin_Latest_PostInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_latest_post =
  /** @type {((inputs?: Admin_Latest_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Latest_PostInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_latest_post(inputs);
      return __zh.admin_latest_post(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Manage posts" |
 *
 * @param {Admin_Manage_PostsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_manage_posts =
  /** @type {((inputs?: Admin_Manage_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Manage_PostsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_manage_posts(inputs);
      return __zh.admin_manage_posts(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Manage posts, assets, comments, API tokens, and site settings for {name}." |
 *
 * @param {Admin_Metric_Overview_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_metric_overview_description =
  /** @type {((inputs: Admin_Metric_Overview_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Metric_Overview_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_metric_overview_description(inputs);
      return __zh.admin_metric_overview_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Moderation queue" |
 *
 * @param {Admin_Moderation_QueueInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_moderation_queue =
  /** @type {((inputs?: Admin_Moderation_QueueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Moderation_QueueInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_moderation_queue(inputs);
      return __zh.admin_moderation_queue(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "{count} comment is waiting for review. New public comments default to pending." |
 *
 * @param {Admin_Moderation_Queue_DetailInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_moderation_queue_detail =
  /** @type {((inputs: Admin_Moderation_Queue_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Moderation_Queue_DetailInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_moderation_queue_detail(inputs);
      return __zh.admin_moderation_queue_detail(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Assets" |
 *
 * @param {Admin_Nav_AssetsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_nav_assets =
  /** @type {((inputs?: Admin_Nav_AssetsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_AssetsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_nav_assets(inputs);
      return __zh.admin_nav_assets(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Comments" |
 *
 * @param {Admin_Nav_CommentsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_nav_comments =
  /** @type {((inputs?: Admin_Nav_CommentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_CommentsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_nav_comments(inputs);
      return __zh.admin_nav_comments(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Overview" |
 *
 * @param {Admin_Nav_OverviewInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_nav_overview =
  /** @type {((inputs?: Admin_Nav_OverviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_OverviewInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_nav_overview(inputs);
      return __zh.admin_nav_overview(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Posts" |
 *
 * @param {Admin_Nav_PostsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_nav_posts =
  /** @type {((inputs?: Admin_Nav_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_PostsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_nav_posts(inputs);
      return __zh.admin_nav_posts(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Settings" |
 *
 * @param {Admin_Nav_SettingsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_nav_settings =
  /** @type {((inputs?: Admin_Nav_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_nav_settings(inputs);
      return __zh.admin_nav_settings(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "New post" |
 *
 * @param {Admin_New_PostInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_new_post =
  /** @type {((inputs?: Admin_New_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_New_PostInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_new_post(inputs);
      return __zh.admin_new_post(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Admin" |
 *
 * @param {Admin_Overview_EyebrowInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_overview_eyebrow =
  /** @type {((inputs?: Admin_Overview_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Overview_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_overview_eyebrow(inputs);
      return __zh.admin_overview_eyebrow(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "CMS overview" |
 *
 * @param {Admin_Overview_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_overview_title =
  /** @type {((inputs?: Admin_Overview_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Overview_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_overview_title(inputs);
      return __zh.admin_overview_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Title" |
 *
 * @param {Admin_Posts_Column_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_column_title =
  /** @type {((inputs?: Admin_Posts_Column_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Column_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_column_title(inputs);
      return __zh.admin_posts_column_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Create bilingual drafts, publish Markdown, and manage status." |
 *
 * @param {Admin_Posts_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_description =
  /** @type {((inputs?: Admin_Posts_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_description(inputs);
      return __zh.admin_posts_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Public URL" |
 *
 * @param {Admin_Posts_Public_UrlInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_public_url =
  /** @type {((inputs?: Admin_Posts_Public_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Public_UrlInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_public_url(inputs);
      return __zh.admin_posts_public_url(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Search posts" |
 *
 * @param {Admin_Posts_SearchInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_search =
  /** @type {((inputs?: Admin_Posts_SearchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_SearchInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_search(inputs);
      return __zh.admin_posts_search(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Source" |
 *
 * @param {Admin_Posts_SourceInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_source =
  /** @type {((inputs?: Admin_Posts_SourceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_SourceInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_source(inputs);
      return __zh.admin_posts_source(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Status" |
 *
 * @param {Admin_Posts_StatusInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_status =
  /** @type {((inputs?: Admin_Posts_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_StatusInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_status(inputs);
      return __zh.admin_posts_status(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Posts" |
 *
 * @param {Admin_Posts_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_title =
  /** @type {((inputs?: Admin_Posts_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_title(inputs);
      return __zh.admin_posts_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Updated" |
 *
 * @param {Admin_Posts_UpdatedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_updated =
  /** @type {((inputs?: Admin_Posts_UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_updated(inputs);
      return __zh.admin_posts_updated(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "View" |
 *
 * @param {Admin_Posts_ViewInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_posts_view =
  /** @type {((inputs?: Admin_Posts_ViewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_ViewInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_posts_view(inputs);
      return __zh.admin_posts_view(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Publish" |
 *
 * @param {Admin_Publish_PostInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_publish_post =
  /** @type {((inputs?: Admin_Publish_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Publish_PostInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_publish_post(inputs);
      return __zh.admin_publish_post(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Save draft" |
 *
 * @param {Admin_Save_DraftInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_save_draft =
  /** @type {((inputs?: Admin_Save_DraftInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Save_DraftInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_save_draft(inputs);
      return __zh.admin_save_draft(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Save settings" |
 *
 * @param {Admin_Save_SettingsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_save_settings =
  /** @type {((inputs?: Admin_Save_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Save_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_save_settings(inputs);
      return __zh.admin_save_settings(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Author bio" |
 *
 * @param {Admin_Settings_Author_BioInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_author_bio =
  /** @type {((inputs?: Admin_Settings_Author_BioInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Author_BioInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_author_bio(inputs);
      return __zh.admin_settings_author_bio(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Author name" |
 *
 * @param {Admin_Settings_Author_NameInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_author_name =
  /** @type {((inputs?: Admin_Settings_Author_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Author_NameInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_author_name(inputs);
      return __zh.admin_settings_author_name(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Default OG image" |
 *
 * @param {Admin_Settings_Default_OgInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_default_og =
  /** @type {((inputs?: Admin_Settings_Default_OgInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Default_OgInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_default_og(inputs);
      return __zh.admin_settings_default_og(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Description" |
 *
 * @param {Admin_Settings_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_description =
  /** @type {((inputs?: Admin_Settings_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_description(inputs);
      return __zh.admin_settings_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Settings could not be saved." |
 *
 * @param {Admin_Settings_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_error =
  /** @type {((inputs?: Admin_Settings_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_error(inputs);
      return __zh.admin_settings_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Basic identity, SEO, RSS, comments, and primary language configuration." |
 *
 * @param {Admin_Settings_HelpInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_help =
  /** @type {((inputs?: Admin_Settings_HelpInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_HelpInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_help(inputs);
      return __zh.admin_settings_help(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Allow search indexing" |
 *
 * @param {Admin_Settings_IndexingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_indexing =
  /** @type {((inputs?: Admin_Settings_IndexingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_IndexingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_indexing(inputs);
      return __zh.admin_settings_indexing(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Primary language" |
 *
 * @param {Admin_Settings_LanguageInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_language =
  /** @type {((inputs?: Admin_Settings_LanguageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_LanguageInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_language(inputs);
      return __zh.admin_settings_language(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Settings saved." |
 *
 * @param {Admin_Settings_SavedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_saved =
  /** @type {((inputs?: Admin_Settings_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_SavedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_saved(inputs);
      return __zh.admin_settings_saved(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Site name" |
 *
 * @param {Admin_Settings_Site_NameInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_site_name =
  /** @type {((inputs?: Admin_Settings_Site_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Site_NameInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_site_name(inputs);
      return __zh.admin_settings_site_name(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Site URL" |
 *
 * @param {Admin_Settings_Site_UrlInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_site_url =
  /** @type {((inputs?: Admin_Settings_Site_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Site_UrlInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_site_url(inputs);
      return __zh.admin_settings_site_url(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Site settings" |
 *
 * @param {Admin_Settings_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_settings_title =
  /** @type {((inputs?: Admin_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_settings_title(inputs);
      return __zh.admin_settings_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Storage contract" |
 *
 * @param {Admin_Storage_ContractInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_storage_contract =
  /** @type {((inputs?: Admin_Storage_ContractInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Storage_ContractInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_storage_contract(inputs);
      return __zh.admin_storage_contract(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "D1 owns structured records. R2 owns images, imports, exports, and backups." |
 *
 * @param {Admin_Storage_Contract_DetailInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_storage_contract_detail =
  /** @type {((inputs?: Admin_Storage_Contract_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Storage_Contract_DetailInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_storage_contract_detail(inputs);
      return __zh.admin_storage_contract_detail(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Create token" |
 *
 * @param {Admin_Create_TokenInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_create_token =
  /** @type {((inputs?: Admin_Create_TokenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Create_TokenInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_create_token(inputs);
      return __zh.admin_create_token(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Revoke" |
 *
 * @param {Admin_Revoke_TokenInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_revoke_token =
  /** @type {((inputs?: Admin_Revoke_TokenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Revoke_TokenInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_revoke_token(inputs);
      return __zh.admin_revoke_token(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Token name" |
 *
 * @param {Admin_Token_NameInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_token_name =
  /** @type {((inputs?: Admin_Token_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_NameInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_token_name(inputs);
      return __zh.admin_token_name(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Revoked" |
 *
 * @param {Admin_Token_RevokedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_token_revoked =
  /** @type {((inputs?: Admin_Token_RevokedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_RevokedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_token_revoked(inputs);
      return __zh.admin_token_revoked(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Token scopes" |
 *
 * @param {Admin_Token_ScopesInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_token_scopes =
  /** @type {((inputs?: Admin_Token_ScopesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_ScopesInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_token_scopes(inputs);
      return __zh.admin_token_scopes(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Token secret" |
 *
 * @param {Admin_Token_Secret_OnceInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_token_secret_once =
  /** @type {((inputs?: Admin_Token_Secret_OnceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_Secret_OnceInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_token_secret_once(inputs);
      return __zh.admin_token_secret_once(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Create scoped automation tokens for CLI, OpenAPI, and AI publishing workflows." |
 *
 * @param {Admin_Tokens_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_tokens_description =
  /** @type {((inputs?: Admin_Tokens_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Tokens_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_tokens_description(inputs);
      return __zh.admin_tokens_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "API tokens" |
 *
 * @param {Admin_Tokens_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const admin_tokens_title =
  /** @type {((inputs?: Admin_Tokens_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Tokens_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.admin_tokens_title(inputs);
      return __zh.admin_tokens_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Use the CMS admin area to manage publishing, settings, and exports." |
 *
 * @param {Account_Management_NoteInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const account_management_note =
  /** @type {((inputs?: Account_Management_NoteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Management_NoteInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.account_management_note(inputs);
      return __zh.account_management_note(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Signed in as" |
 *
 * @param {Account_Signed_In_AsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const account_signed_in_as =
  /** @type {((inputs?: Account_Signed_In_AsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Signed_In_AsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.account_signed_in_as(inputs);
      return __zh.account_signed_in_as(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Account" |
 *
 * @param {Account_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const account_title =
  /** @type {((inputs?: Account_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.account_title(inputs);
      return __zh.account_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Archive" |
 *
 * @param {Archive_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const archive_title =
  /** @type {((inputs?: Archive_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Archive_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.archive_title(inputs);
      return __zh.archive_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Use scoped API tokens for publishing, imports, exports, assets, and comment moderation." |
 *
 * @param {Api_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_description =
  /** @type {((inputs?: Api_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_description(inputs);
      return __zh.api_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "API" |
 *
 * @param {Api_EyebrowInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_eyebrow =
  /** @type {((inputs?: Api_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_eyebrow(inputs);
      return __zh.api_eyebrow(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Manage settings" |
 *
 * @param {Api_Manage_SettingsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_manage_settings =
  /** @type {((inputs?: Api_Manage_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_Manage_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_manage_settings(inputs);
      return __zh.api_manage_settings(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Method" |
 *
 * @param {Api_MethodInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_method =
  /** @type {((inputs?: Api_MethodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_MethodInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_method(inputs);
      return __zh.api_method(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Open OpenAPI JSON" |
 *
 * @param {Api_Open_OpenapiInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_open_openapi =
  /** @type {((inputs?: Api_Open_OpenapiInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_Open_OpenapiInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_open_openapi(inputs);
      return __zh.api_open_openapi(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Path" |
 *
 * @param {Api_PathInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_path =
  /** @type {((inputs?: Api_PathInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_PathInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_path(inputs);
      return __zh.api_path(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Scope" |
 *
 * @param {Api_ScopeInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_scope =
  /** @type {((inputs?: Api_ScopeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_ScopeInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_scope(inputs);
      return __zh.api_scope(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "OpenAPI and automation endpoints" |
 *
 * @param {Api_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_title =
  /** @type {((inputs?: Api_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_title(inputs);
      return __zh.api_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Token scopes" |
 *
 * @param {Api_Token_ScopesInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const api_token_scopes =
  /** @type {((inputs?: Api_Token_ScopesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_Token_ScopesInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.api_token_scopes(inputs);
      return __zh.api_token_scopes(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Back to home" |
 *
 * @param {Back_HomeInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const back_home =
  /** @type {((inputs?: Back_HomeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Back_HomeInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.back_home(inputs);
      return __zh.back_home(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Articles about the Cloud Blog CMS template, Cloudflare-native storage, Markdown publishing, and automation workflows." |
 *
 * @param {Blog_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_description =
  /** @type {((inputs?: Blog_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_description(inputs);
      return __zh.blog_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Blog" |
 *
 * @param {Blog_EyebrowInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_eyebrow =
  /** @type {((inputs?: Blog_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_eyebrow(inputs);
      return __zh.blog_eyebrow(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "All" |
 *
 * @param {Blog_Filter_AllInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_filter_all =
  /** @type {((inputs?: Blog_Filter_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Filter_AllInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_filter_all(inputs);
      return __zh.blog_filter_all(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Filter posts by tag" |
 *
 * @param {Blog_Filter_LabelInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_filter_label =
  /** @type {((inputs?: Blog_Filter_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Filter_LabelInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_filter_label(inputs);
      return __zh.blog_filter_label(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "No posts matched this search." |
 *
 * @param {Blog_No_ResultsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_no_results =
  /** @type {((inputs?: Blog_No_ResultsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_No_ResultsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_no_results(inputs);
      return __zh.blog_no_results(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Search posts" |
 *
 * @param {Blog_Search_PlaceholderInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_search_placeholder =
  /** @type {((inputs?: Blog_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_search_placeholder(inputs);
      return __zh.blog_search_placeholder(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Search" |
 *
 * @param {Blog_Search_SubmitInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_search_submit =
  /** @type {((inputs?: Blog_Search_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Search_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_search_submit(inputs);
      return __zh.blog_search_submit(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Durable publishing notes" |
 *
 * @param {Blog_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const blog_title =
  /** @type {((inputs?: Blog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.blog_title(inputs);
      return __zh.blog_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Comment" |
 *
 * @param {Comment_BodyInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_body =
  /** @type {((inputs?: Comment_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_BodyInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_body(inputs);
      return __zh.comment_body(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Company" |
 *
 * @param {Comment_CompanyInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_company =
  /** @type {((inputs?: Comment_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_company(inputs);
      return __zh.comment_company(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Email" |
 *
 * @param {Comment_EmailInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_email =
  /** @type {((inputs?: Comment_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_EmailInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_email(inputs);
      return __zh.comment_email(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Comment could not be submitted." |
 *
 * @param {Comment_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_error =
  /** @type {((inputs?: Comment_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_error(inputs);
      return __zh.comment_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Name" |
 *
 * @param {Comment_NameInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_name =
  /** @type {((inputs?: Comment_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_NameInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_name(inputs);
      return __zh.comment_name(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Submitting..." |
 *
 * @param {Comment_SubmittingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_submitting =
  /** @type {((inputs?: Comment_SubmittingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_SubmittingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_submitting(inputs);
      return __zh.comment_submitting(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Comment submitted for review." |
 *
 * @param {Comment_SuccessInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_success =
  /** @type {((inputs?: Comment_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_success(inputs);
      return __zh.comment_success(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Website" |
 *
 * @param {Comment_WebsiteInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comment_website =
  /** @type {((inputs?: Comment_WebsiteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_WebsiteInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comment_website(inputs);
      return __zh.comment_website(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Comments" |
 *
 * @param {CommentsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comments =
  /** @type {((inputs?: CommentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<CommentsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comments(inputs);
      return __zh.comments(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "New comments are held for review before publication." |
 *
 * @param {Comments_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const comments_description =
  /** @type {((inputs?: Comments_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comments_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.comments_description(inputs);
      return __zh.comments_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Contents" |
 *
 * @param {ContentsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const contents =
  /** @type {((inputs?: ContentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<ContentsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.contents(inputs);
      return __zh.contents(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "CLI + API" |
 *
 * @param {Feature_Api_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const feature_api_title =
  /** @type {((inputs?: Feature_Api_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Api_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.feature_api_title(inputs);
      return __zh.feature_api_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Automation surfaces for developers and AI agents." |
 *
 * @param {Feature_Api_BodyInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const feature_api_body =
  /** @type {((inputs?: Feature_Api_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Api_BodyInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.feature_api_body(inputs);
      return __zh.feature_api_body(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Posts, comments, settings, users, and API tokens." |
 *
 * @param {Feature_D1_BodyInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const feature_d1_body =
  /** @type {((inputs?: Feature_D1_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_D1_BodyInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.feature_d1_body(inputs);
      return __zh.feature_d1_body(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Moderation" |
 *
 * @param {Feature_Moderation_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const feature_moderation_title =
  /** @type {((inputs?: Feature_Moderation_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Moderation_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.feature_moderation_title(inputs);
      return __zh.feature_moderation_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Pending comments, Turnstile, rate limits, and spam review." |
 *
 * @param {Feature_Moderation_BodyInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const feature_moderation_body =
  /** @type {((inputs?: Feature_Moderation_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Moderation_BodyInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.feature_moderation_body(inputs);
      return __zh.feature_moderation_body(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Images, imports, exports, attachments, and backups." |
 *
 * @param {Feature_R2_BodyInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const feature_r2_body =
  /** @type {((inputs?: Feature_R2_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_R2_BodyInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.feature_r2_body(inputs);
      return __zh.feature_r2_body(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Featured" |
 *
 * @param {FeaturedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const featured =
  /** @type {((inputs?: FeaturedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<FeaturedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.featured(inputs);
      return __zh.featured(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "GitHub repository" |
 *
 * @param {Github_RepositoryInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const github_repository =
  /** @type {((inputs?: Github_RepositoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Github_RepositoryInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.github_repository(inputs);
      return __zh.github_repository(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "EN: Cloud Blog CMS is a Cloudflare-native personal publishing system with visual writing, Markdown import, bilingual content, and AI-ready automation." |
 *
 * @param {Home_Bilingual_Intro_EnInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const home_bilingual_intro_en =
  /** @type {((inputs?: Home_Bilingual_Intro_EnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Bilingual_Intro_EnInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.home_bilingual_intro_en(inputs);
      return __zh.home_bilingual_intro_en(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "中文：Cloud Blog CMS 是面向个人创作者的 Cloudflare 原生发布系统，支持可视化写作、Markdown 导入、中英文内容和 AI 自动化。" |
 *
 * @param {Home_Bilingual_Intro_ZhInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const home_bilingual_intro_zh =
  /** @type {((inputs?: Home_Bilingual_Intro_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Bilingual_Intro_ZhInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.home_bilingual_intro_zh(inputs);
      return __zh.home_bilingual_intro_zh(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Cloudflare-native Personal Blog CMS" |
 *
 * @param {Home_EyebrowInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const home_eyebrow =
  /** @type {((inputs?: Home_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.home_eyebrow(inputs);
      return __zh.home_eyebrow(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Publishing stack notes" |
 *
 * @param {Home_Featured_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const home_featured_title =
  /** @type {((inputs?: Home_Featured_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Featured_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.home_featured_title(inputs);
      return __zh.home_featured_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Browse by publishing workflow, Cloudflare infrastructure, and AI automation." |
 *
 * @param {Home_Tags_DescriptionInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const home_tags_description =
  /** @type {((inputs?: Home_Tags_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Tags_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.home_tags_description(inputs);
      return __zh.home_tags_description(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Language" |
 *
 * @param {LanguageInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const language =
  /** @type {((inputs?: LanguageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<LanguageInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.language(inputs);
      return __zh.language(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "English" |
 *
 * @param {Language_EnglishInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const language_english =
  /** @type {((inputs?: Language_EnglishInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_EnglishInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.language_english(inputs);
      return __zh.language_english(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Switch to English" |
 *
 * @param {Language_Switch_To_EnInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const language_switch_to_en =
  /** @type {((inputs?: Language_Switch_To_EnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_Switch_To_EnInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.language_switch_to_en(inputs);
      return __zh.language_switch_to_en(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "切换到中文" |
 *
 * @param {Language_Switch_To_ZhInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const language_switch_to_zh =
  /** @type {((inputs?: Language_Switch_To_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_Switch_To_ZhInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.language_switch_to_zh(inputs);
      return __zh.language_switch_to_zh(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "中文" |
 *
 * @param {Language_ZhInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const language_zh =
  /** @type {((inputs?: Language_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_ZhInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.language_zh(inputs);
      return __zh.language_zh(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Latest posts" |
 *
 * @param {Latest_PostsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const latest_posts =
  /** @type {((inputs?: Latest_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Latest_PostsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.latest_posts(inputs);
      return __zh.latest_posts(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Login" |
 *
 * @param {LoginInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login =
  /** @type {((inputs?: LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<LoginInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login(inputs);
      return __zh.login(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Or" |
 *
 * @param {Login_AlternativeInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_alternative =
  /** @type {((inputs?: Login_AlternativeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_AlternativeInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_alternative(inputs);
      return __zh.login_alternative(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Email" |
 *
 * @param {Login_EmailInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_email =
  /** @type {((inputs?: Login_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_EmailInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_email(inputs);
      return __zh.login_email(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "An error occurred while signing in." |
 *
 * @param {Login_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_error =
  /** @type {((inputs?: Login_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_error(inputs);
      return __zh.login_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Welcome back to {name}" |
 *
 * @param {Login_GreetingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_greeting =
  /** @type {((inputs: Login_GreetingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_GreetingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_greeting(inputs);
      return __zh.login_greeting(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Don't have an account?" |
 *
 * @param {Login_No_AccountInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_no_account =
  /** @type {((inputs?: Login_No_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_No_AccountInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_no_account(inputs);
      return __zh.login_no_account(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Password" |
 *
 * @param {Login_PasswordInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_password =
  /** @type {((inputs?: Login_PasswordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_PasswordInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_password(inputs);
      return __zh.login_password(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Enter password here" |
 *
 * @param {Login_Password_PlaceholderInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_password_placeholder =
  /** @type {((inputs?: Login_Password_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_Password_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_password_placeholder(inputs);
      return __zh.login_password_placeholder(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Logging in..." |
 *
 * @param {Login_PendingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_pending =
  /** @type {((inputs?: Login_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_PendingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_pending(inputs);
      return __zh.login_pending(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "An error occurred during {provider} sign-in." |
 *
 * @param {Login_Social_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_social_error =
  /** @type {((inputs: Login_Social_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_Social_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_social_error(inputs);
      return __zh.login_social_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Login with {provider}" |
 *
 * @param {Login_With_ProviderInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const login_with_provider =
  /** @type {((inputs: Login_With_ProviderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_With_ProviderInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.login_with_provider(inputs);
      return __zh.login_with_provider(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "About" |
 *
 * @param {Nav_AboutInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const nav_about =
  /** @type {((inputs?: Nav_AboutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_AboutInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.nav_about(inputs);
      return __zh.nav_about(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Archive" |
 *
 * @param {Nav_ArchiveInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const nav_archive =
  /** @type {((inputs?: Nav_ArchiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ArchiveInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.nav_archive(inputs);
      return __zh.nav_archive(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Blog" |
 *
 * @param {Nav_BlogInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const nav_blog =
  /** @type {((inputs?: Nav_BlogInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_BlogInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.nav_blog(inputs);
      return __zh.nav_blog(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Projects" |
 *
 * @param {Nav_ProjectsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const nav_projects =
  /** @type {((inputs?: Nav_ProjectsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ProjectsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.nav_projects(inputs);
      return __zh.nav_projects(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Tags" |
 *
 * @param {Nav_TagsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const nav_tags =
  /** @type {((inputs?: Nav_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_TagsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.nav_tags(inputs);
      return __zh.nav_tags(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Open CMS" |
 *
 * @param {Open_CmsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const open_cms =
  /** @type {((inputs?: Open_CmsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Open_CmsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.open_cms(inputs);
      return __zh.open_cms(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Pinned" |
 *
 * @param {PinnedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const pinned =
  /** @type {((inputs?: PinnedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<PinnedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.pinned(inputs);
      return __zh.pinned(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Next" |
 *
 * @param {Pagination_NextInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const pagination_next =
  /** @type {((inputs?: Pagination_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pagination_NextInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.pagination_next(inputs);
      return __zh.pagination_next(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Page {current} of {total}" |
 *
 * @param {Pagination_PageInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const pagination_page =
  /** @type {((inputs: Pagination_PageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pagination_PageInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.pagination_page(inputs);
      return __zh.pagination_page(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Previous" |
 *
 * @param {Pagination_PreviousInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const pagination_previous =
  /** @type {((inputs?: Pagination_PreviousInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pagination_PreviousInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.pagination_previous(inputs);
      return __zh.pagination_previous(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "{count} posts" |
 *
 * @param {Posts_CountInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const posts_count =
  /** @type {((inputs: Posts_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Posts_CountInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.posts_count(inputs);
      return __zh.posts_count(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Projects" |
 *
 * @param {Projects_EyebrowInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const projects_eyebrow =
  /** @type {((inputs?: Projects_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Projects_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.projects_eyebrow(inputs);
      return __zh.projects_eyebrow(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Template and Skill deliverables" |
 *
 * @param {Projects_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const projects_title =
  /** @type {((inputs?: Projects_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Projects_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.projects_title(inputs);
      return __zh.projects_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "{count} published" |
 *
 * @param {Published_CountInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const published_count =
  /** @type {((inputs: Published_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Published_CountInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.published_count(inputs);
      return __zh.published_count(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Read latest posts" |
 *
 * @param {Read_Latest_PostsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const read_latest_posts =
  /** @type {((inputs?: Read_Latest_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Read_Latest_PostsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.read_latest_posts(inputs);
      return __zh.read_latest_posts(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Related" |
 *
 * @param {RelatedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const related =
  /** @type {((inputs?: RelatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<RelatedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.related(inputs);
      return __zh.related(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "RSS feed" |
 *
 * @param {Rss_FeedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const rss_feed =
  /** @type {((inputs?: Rss_FeedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Rss_FeedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.rss_feed(inputs);
      return __zh.rss_feed(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Cloudflare-native publishing" |
 *
 * @param {Site_SubtitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const site_subtitle =
  /** @type {((inputs?: Site_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Site_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.site_subtitle(inputs);
      return __zh.site_subtitle(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Sign up" |
 *
 * @param {SignupInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup =
  /** @type {((inputs?: SignupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<SignupInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup(inputs);
      return __zh.signup(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Confirm Password" |
 *
 * @param {Signup_Confirm_PasswordInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_confirm_password =
  /** @type {((inputs?: Signup_Confirm_PasswordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Confirm_PasswordInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_confirm_password(inputs);
      return __zh.signup_confirm_password(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "An error occurred while signing up." |
 *
 * @param {Signup_ErrorInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_error =
  /** @type {((inputs?: Signup_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_error(inputs);
      return __zh.signup_error(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Create your {name} admin account" |
 *
 * @param {Signup_GreetingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_greeting =
  /** @type {((inputs: Signup_GreetingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_GreetingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_greeting(inputs);
      return __zh.signup_greeting(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Already have an account?" |
 *
 * @param {Signup_Has_AccountInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_has_account =
  /** @type {((inputs?: Signup_Has_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Has_AccountInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_has_account(inputs);
      return __zh.signup_has_account(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Name" |
 *
 * @param {Signup_NameInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_name =
  /** @type {((inputs?: Signup_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_NameInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_name(inputs);
      return __zh.signup_name(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Passwords do not match." |
 *
 * @param {Signup_Password_MismatchInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_password_mismatch =
  /** @type {((inputs?: Signup_Password_MismatchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Password_MismatchInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_password_mismatch(inputs);
      return __zh.signup_password_mismatch(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Signing up..." |
 *
 * @param {Signup_PendingInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const signup_pending =
  /** @type {((inputs?: Signup_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_PendingInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.signup_pending(inputs);
      return __zh.signup_pending(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Sign out" |
 *
 * @param {Sign_OutInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const sign_out =
  /** @type {((inputs?: Sign_OutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sign_OutInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.sign_out(inputs);
      return __zh.sign_out(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Submit comment" |
 *
 * @param {Submit_CommentInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const submit_comment =
  /** @type {((inputs?: Submit_CommentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Submit_CommentInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.submit_comment(inputs);
      return __zh.submit_comment(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Tag" |
 *
 * @param {Tag_EyebrowInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const tag_eyebrow =
  /** @type {((inputs?: Tag_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tag_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.tag_eyebrow(inputs);
      return __zh.tag_eyebrow(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Tags" |
 *
 * @param {Tags_TitleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const tags_title =
  /** @type {((inputs?: Tags_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tags_TitleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.tags_title(inputs);
      return __zh.tags_title(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Dark" |
 *
 * @param {Theme_DarkInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const theme_dark =
  /** @type {((inputs?: Theme_DarkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_DarkInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.theme_dark(inputs);
      return __zh.theme_dark(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Light" |
 *
 * @param {Theme_LightInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const theme_light =
  /** @type {((inputs?: Theme_LightInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_LightInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.theme_light(inputs);
      return __zh.theme_light(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "System" |
 *
 * @param {Theme_SystemInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const theme_system =
  /** @type {((inputs?: Theme_SystemInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_SystemInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.theme_system(inputs);
      return __zh.theme_system(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Toggle theme" |
 *
 * @param {Theme_ToggleInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const theme_toggle =
  /** @type {((inputs?: Theme_ToggleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_ToggleInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.theme_toggle(inputs);
      return __zh.theme_toggle(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Updated" |
 *
 * @param {UpdatedInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const updated =
  /** @type {((inputs?: UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.updated(inputs);
      return __zh.updated(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "Upload" |
 *
 * @param {UploadInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const upload =
  /** @type {((inputs?: UploadInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<UploadInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.upload(inputs);
      return __zh.upload(inputs);
    }
  );
/**
 * | output |
 * | --- |
 * | "View all posts" |
 *
 * @param {View_All_PostsInputs} inputs
 * @param {{ locale?: "en" | "zh" }} options
 * @returns {LocalizedString}
 */
export const view_all_posts =
  /** @type {((inputs?: View_All_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<View_All_PostsInputs, { locale?: "en" | "zh" }, {}>} */ (
    (inputs = {}, options = {}) => {
      const locale = experimentalStaticLocale ?? options.locale ?? getLocale();
      if (locale === "en") return __en.view_all_posts(inputs);
      return __zh.view_all_posts(inputs);
    }
  );
