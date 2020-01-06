class Api::SlogansController < ApplicationController


  def create
    @slogan = Slogan.new(slogan_params)

    unless @slogan.save
        format.json { render json: @slogan.errors, status: :unprocessable_entity }
    end

    render :show
  end


  private
    def slogan_params
      params.require(:slogan).permit(
        :first_name,
        :last_name,
        :email,
        :slogan
      )
    end

end
