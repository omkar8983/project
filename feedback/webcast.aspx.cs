using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class webcast : System.Web.UI.Page
{
    readonly string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Button1_Click(object sender, EventArgs e)
    {

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
            cmd.Parameters.AddWithValue("@Name", "rupali");
            cmd.Parameters.AddWithValue("@EmailID", "hello@hello.com");
            cmd.Parameters.AddWithValue("@EventUrl", "/events/21186/");
            cmd.Parameters.AddWithValue("@EventCode", "24FDEvent_1013");
            cmd.Parameters.AddWithValue("@Question", "test");
            cmd.Parameters.AddWithValue("@Answer", "aa");
            cmd.Parameters.AddWithValue("@AnswerDate", cstTime);


            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);
            Label1.Text = "Success";

        }
        catch (Exception ex)
        {

            Label1.Text = ex.Message.ToString();

        }
        //return  Json(_event);
       
    }
}