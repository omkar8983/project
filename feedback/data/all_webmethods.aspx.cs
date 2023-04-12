using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Services;

public partial class data_all_webmethods : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [System.Web.Services.WebMethod]
    public static string sendParameter(string Name,string Email,string EventId, string Question)
    {
        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

        try
        {
            string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //string eid = getEventcode(_event.Replaceurl);
            DateTime timeUtc = DateTime.UtcNow;
            TimeZoneInfo mumbaitimezoon = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(timeUtc, mumbaitimezoon);
            DateTime dt = cstTime;
            string lastlogin = dt.ToString("MM/dd/yyyy,HH:mm:ss");
            SqlConnection con = new SqlConnection(_connString);
            DataSet ds = new DataSet();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = "VCM_SendParameter";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Name", Name);
            cmd.Parameters.AddWithValue("@EmailID",Email);
            //cmd.Parameters.AddWithValue("@Location", _event.Location);
            //cmd.Parameters.AddWithValue("@Phone", _event.Phone);
            //cmd.Parameters.AddWithValue("@org", empid);
            cmd.Parameters.AddWithValue("@AskedOn", cstTime);
            //cmd.Parameters.AddWithValue("@IPAddress", _event.Clientip);
            cmd.Parameters.AddWithValue("@EventID", EventId);
            cmd.Parameters.AddWithValue("@Question", Question);

            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);
            if (ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataTable table in ds.Tables)
                    {

                        foreach (DataRow dr in table.Rows)
                        {
                           return  dr["ret"].ToString();


                        }
                    }
                }
                else
                {
                    return "2";
                }
            }
            else
            {
                return "2";
            }
        }
        catch (Exception ex)
        {

            return ex.Message.ToString();

        }

        return "2";
        //return Json(_event, JsonRequestBehavior.AllowGet);
    }
    //web method to register_proceed
    [System.Web.Services.WebMethod]
    public static string AddPollAnsData(string name, string email, string eventid, string Replaceurl, string Question,string Answer)
    {
         string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;


        try
        {
            //string eid = getEventcode(_event.Replaceurl);
            DateTime timeUtc = DateTime.UtcNow;
            TimeZoneInfo mumbaitimezoon = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(timeUtc, mumbaitimezoon);
            DateTime dt = cstTime;
            string lastlogin = dt.ToString("MM/dd/yyyy,HH:mm:ss");
            SqlConnection con = new SqlConnection(_connString);
            DataSet ds = new DataSet();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = "VCM_PollDetail_SP";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "AddPollAnswer");
            cmd.Parameters.AddWithValue("@Name", name);
            cmd.Parameters.AddWithValue("@EmailID", email);
            cmd.Parameters.AddWithValue("@EventUrl", Replaceurl);
            cmd.Parameters.AddWithValue("@EventCode", eventid);
            cmd.Parameters.AddWithValue("@Question", Question);
            cmd.Parameters.AddWithValue("@Answer", Answer);
            cmd.Parameters.AddWithValue("@AnswerDate", cstTime);


            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);
            return "Success";

        }
        catch (Exception ex)
        {

            return ex.Message.ToString();

        }

    }
   
    
    
    [System.Web.Services.WebMethod]
    public static List<Messages> GetAllMessages(string eventid)
    {
        string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        var messages = new List<Messages>();
        using (var connection = new SqlConnection(_connString))
        {
            connection.Open();
            //using (var command = new SqlCommand(@"SELECT [MessageID], [Message], [EmptyMessage], [Date],[MyName] FROM [dbo].[Messages]", connection))
            //using (var command = new SqlCommand(@"Select [snumber],[emailid],[logintime],[logouttime],[eventid],[flag1],[flag2],[flag3] from [dbo].[vc_userlog] where IsReadyForVOS =  1", connection))
            //select streamname, streamname2, speakername, slates, sessionname, datetimepicker, status, slidefile, slidedetails, questionaskedby, questiondetails from pagedetails where slateallow = 'show' and url = @url
            //using (var command = new SqlCommand(@"Select [streamname],[streamname2],[speakername],[slates],[sessionname],CONVERT(VARCHAR(10), EventTimer, 101) + ' '+ convert(VARCHAR(8), cast(EventTimer as datetime), 14) as EventTimer,[status],[slidefile],[slidedetails],[questionaskedby],[questiondetails],[eventid],[SlateImage],[Option1],[Option2],[Option3],[Option4],[Option5],[Option6], [datetimepicker]  from [dbo].[pagedetails] where slateallow = 'show' and IsNull(IsUpdatedForEvent,0) = 1 ", connection))
            using (var command = new SqlCommand(@"Select [streamname],[streamname2],[speakername],[slates],[sessionname],[EventTimer],[status],[slidefile],[slidedetails],[questionaskedby],[questiondetails],[eventid],[SlateImage],[PollDetails],[PollLiveTime],[PollIsActive],[col1],[col2],[col3],[col4],[col5],[col6],[col7],[col8],[col9],[col10] from [dbo].[pagedetails] where slateallow = 'show' and IsNull(IsUpdatedForEvent,0) = 1 and eventid='"+eventid+"'", connection))
            //using (var command = new SqlCommand(@"Exec sp_GetUserLogs", connection))
            {
     

                var reader = command.ExecuteReader();
                // string[] value2= { };

                while (reader.Read())
                {
                    //messages.Add(item: new Messages { MessageID = (int)reader["MessageID"], Message = (string)reader["Message"], EmptyMessage =  reader["EmptyMessage"] != DBNull.Value ? (string) reader["EmptyMessage"] : "", MessageDate = Convert.ToDateTime(reader["Date"]), MyName = reader["MyName"] != DBNull.Value ? (string)reader["MyName"] : "" });
                    messages.Add(item: new Messages
                    {
                        streamname = reader["streamname"] != DBNull.Value ? (string)reader["streamname"] : "",
                        streamname2 = reader["streamname2"] != DBNull.Value ? (string)reader["streamname2"] : "",
                        speakername = reader["speakername"] != DBNull.Value ? (string)reader["speakername"] : "",
                        slates = reader["slates"] != DBNull.Value ? (string)reader["slates"] : "",
                        sessionname = reader["sessionname"] != DBNull.Value ? (string)reader["sessionname"] : "",
                        EventTimer = reader["EventTimer"] != DBNull.Value ? (string)reader["EventTimer"] : "",
                        status = reader["status"] != DBNull.Value ? (string)reader["status"] : "",
                        slidefile = reader["slidefile"] != DBNull.Value ? (string)reader["slidefile"] : "",
                        slidedetails = reader["slidedetails"] != DBNull.Value ? (string)reader["slidedetails"] : "",
                        questionaskedby = reader["questionaskedby"] != DBNull.Value ? (string)reader["questionaskedby"] : "",
                        questiondetails = reader["questiondetails"] != DBNull.Value ? (string)reader["questiondetails"] : "",
                        eventid = reader["eventid"] != DBNull.Value ? (string)reader["eventid"] : "",
                        SlateImage = reader["SlateImage"] != DBNull.Value ? (string)reader["SlateImage"] : "",
                        //Question = reader["Question"] != DBNull.Value ? (string)reader["Question"] : "",
                        //Option1 = reader["Option1"] != DBNull.Value ? (string)reader["Option1"] : "",
                        //Option2 = reader["Option2"] != DBNull.Value ? (string)reader["Option2"] : "",
                        //Option3 = reader["Option3"] != DBNull.Value ? (string)reader["Option3"] : "",
                        //Option4 = reader["Option4"] != DBNull.Value ? (string)reader["Option4"] : "",
                        //Option5 = reader["Option5"] != DBNull.Value ? (string)reader["Option5"] : "",
                        //Option6 = reader["Option6"] != DBNull.Value ? (string)reader["Option6"] : "",
                        PollDetails = reader["PollDetails"] != DBNull.Value ? (string)reader["PollDetails"] : "",
                        PollLiveTime = reader["PollLiveTime"] != DBNull.Value ? (string)reader["PollLiveTime"] : "",
                        PollIsActive = reader["PollIsActive"] != DBNull.Value ? (string)reader["PollIsActive"] : "",
                        col1 = reader["col1"] != DBNull.Value ? (string)reader["col1"] : "",
                        col2 = reader["col2"] != DBNull.Value ? (string)reader["col2"] : "",
                        col3 = reader["col3"] != DBNull.Value ? (string)reader["col3"] : "",
                        col4 = reader["col4"] != DBNull.Value ? (string)reader["col4"] : "",
                        col5 = reader["col5"] != DBNull.Value ? (string)reader["col5"] : "",
                        col6 = reader["col6"] != DBNull.Value ? (string)reader["col6"] : "",
                        col7 = reader["col7"] != DBNull.Value ? (string)reader["col7"] : "",
                        col8 = reader["col8"] != DBNull.Value ? (string)reader["col8"] : "",
                        col9 = reader["col9"] != DBNull.Value ? (string)reader["col9"] : "",
                        col10 = reader["col10"] != DBNull.Value ? (string)reader["col10"] : "",

                    });
                    //string abcd =   deactivatePageDetails(reader["eventid"] != DBNull.Value ? (string)reader["eventid"] : "");
                }
            }

        }
        return messages;


    }

    public class Messages
    {
        public int MessageID { get; set; }

        public string Message { get; set; }

        public string EmptyMessage { get; set; }

        public DateTime MessageDate { get; set; }
        public int snumber { get; set; }
        public string MyName { get; set; }
        public string streamname { get; set; }//0
        public string streamname2 { get; set; }//1
        public string speakername { get; set; }//2
        public string slates { get; set; }//3
        public string sessionname { get; set; }//4
        public string datetimepicker { get; set; }//5
        public string status { get; set; }//6
        public string slidefile { get; set; }//7
        public string slidedetails { get; set; }//8
        public string questionaskedby { get; set; }//9
        public string questiondetails { get; set; }//10
        public string eventid { get; set; }
        public string SlateImage { get; set; }

        public string Question { get; set; }

        public string Option1 { get; set; }

        public string Option2 { get; set; }

        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Option5 { get; set; }
        public string Option6 { get; set; }

        public string[] value2 { get; set; }

        public string EventTimer { get; set; }
        public string PollLiveTime { get; set; }

        public string PollDetails { get; set; }

        public string PollIsActive { get; set; }
        public string col1 { get; set; }
        public string col2 { get; set; }
        public string col3 { get; set; }
        public string col4 { get; set; }
        public string col5 { get; set; }
        public string col6 { get; set; }
        public string col7 { get; set; }
        public string col8 { get; set; }
        public string col9 { get; set; }
        public string col10 { get; set; }

    }

    public class Event
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Speciality { get; set; }

        public string a_location { get; set; }
        public string Eventid { get; set; }
        public string Replaceurl { get; set; }
        public string Clientip { get; set; }
        public int retStatus { get; set; }
        public string originalURL { get; set; }
        public string Question { get; set; }

        public string Answer { get; set; }

        public string ActualAnswer { get; set; }

        public string AnswerDate { get; set; }

        public string Status { get; set; }

        public string result { get; set; }

        public int SecurityTypeID { get; set; }

        public string security_type_data { get; set; }

        public string org { get; set; }

        public string devtype { get; set; }
    }
}