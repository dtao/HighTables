require "haml"
require "sass"
require "sinatra"

get "/" do
  haml :index
end

get "/sass/*.css" do |stylesheet|
  sass :"#{stylesheet}"
end
