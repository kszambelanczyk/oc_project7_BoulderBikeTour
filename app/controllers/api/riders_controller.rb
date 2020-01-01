class Api::RidersController < ApplicationController

    def index
        @riders = Rider.all
    end


    def show
        @rider = Rider.first
    end


end
