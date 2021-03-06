class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    before_action :is_authorized

    def is_authorized
        render json: {error: "Please sign-in for access"} unless is_signed_in
    end

    def is_signed_in
        !!current_user
    end

    def current_user
        auth_header = request.headers["Authorization"]
        if auth_header
            user_token = auth_header.split(" ")[1]
            begin
                @user_id = JWT.decode(user_token, Rails.application.secrets.secret_key_base[0])[0]["user_id"]
            rescue JWT::DecodeError 
                nil
            end
        end
        if(@user_id)
            @user = User.find(@user_id)
        else 
            nil
        end
    end
end



