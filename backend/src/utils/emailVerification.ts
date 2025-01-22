import transporter from "../config/emailConfig";
import { IUser } from "../model/userModel";
import Verification from "../model/emailVerifyModel";

export default async function sendEmailVerification(req: Request, user: IUser) {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 15);

  await Verification.findByIdAndUpdate({
    where: {
      user_id: user?._id!,
      otp: `${OTP}`,
    },
  });

  // OTP Verification Link
  const otpVerifyLink = `${process.env.FRONTEND_HOST}/account/verify-email`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "OTP - Verify your account",
    html: `
        <div>
            <p>Dear ${user.name}</p>
            <p>Thank your for siging up with our service.</p>
            <p>To complete the registration, please verify your email address by entering the following OTP : <a href=${otpVerifyLink}>Click Here</a></p>
            <h2>${OTP}</h2>
            <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>
        </div>
        `,
  });

  return OTP;
}
